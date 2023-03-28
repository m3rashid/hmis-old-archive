package auth

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hmis/utils/db"
	"golang.org/x/crypto/bcrypt"
)

func CurrentUser(c *gin.Context) *User {
	sub, _ := c.Get("sub")
	user, _ := FindUserByColum("id", sub)
	return user
}

func AuthPingHandler(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}

func ChangePasswordHandler(c *gin.Context) {
	sub, _ := c.Get("sub")
	var change ChangePassword
	var oldPassword string
	var user *User

	if err := c.ShouldBind(&change); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if change.Password != change.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"status": "password and password confirm not match"})
		return
	}

	var subData PayloadSub
	if str, ok := sub.(string); ok {
		unMarshalError := json.Unmarshal([]byte(str), &subData)
		if unMarshalError != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Status": "Invalid Token"})
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"Status": "Invalid Token"})
		return
	}

	user, _ = FindUserByColum("id", sub)
	oldPassword = user.Password

	err := bcrypt.CompareHashAndPassword([]byte(oldPassword), []byte(change.OriginalPassword))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "origin password error"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(change.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	password := string(hash)
	var payload Payload
	db.DB.Model(&user).Updates(User{Password: password})
	payload, err = GenPayload(*user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	RevokeLastJwt(payload)

	c.JSON(http.StatusOK, gin.H{"status": "update password success"})
}

func SignUpHandler(c *gin.Context) {
	var params map[string]string
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	password := params["password"]
	confirm__password := params["confirm_password"]
	user, notFound := FindUserByColum("email", params["email"])
	if !notFound {
		c.JSON(http.StatusBadRequest, gin.H{"error": "account exists"})
		return
	}

	if password != confirm__password {
		c.JSON(http.StatusBadRequest, gin.H{"status": "password confirmation dismatch"})
		return
	}

	bcryptedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": err.Error()})
	}
	user = &User{Email: params["email"], Password: string(bcryptedPassword)}
	db.DB.Create(user)
	c.JSON(http.StatusOK, gin.H{"status": "register success"})
}

func SignInHandler(c *gin.Context) {
	var params map[string]string
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, found := FindUserByColum("email", params["email"])
	if !found {
		c.JSON(http.StatusBadRequest, gin.H{"error": "account not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params["password"]))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "accout or password error"})
		return
	}

	payload, payloadErr := GenPayload(*user)
	if payloadErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{})
		return
	}
	tokenString := Encoder(payload)
	OnJwtDispatch(payload)

	c.Header("Authorization", "Bearer "+tokenString)
	c.JSON(http.StatusOK, gin.H{"status": "login success"})
}
