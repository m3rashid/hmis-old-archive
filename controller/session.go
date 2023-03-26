package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hmis/db"
	"github.com/m3rashid/hmis/jwt"
	"github.com/m3rashid/hmis/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUpHandler(c *gin.Context) {
	var params map[string]string
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	password := params["password"]
	confirm__password := params["confirm_password"]
	user, notFound := models.FindUserByColum("email", params["email"])
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
	user = &models.User{Email: params["email"], Password: string(bcryptedPassword)}
	db.DB.Create(user)
	c.JSON(http.StatusOK, gin.H{"status": "register success"})
}

func SignInHandler(c *gin.Context) {
	var params map[string]string
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, found := models.FindUserByColum("email", params["email"])
	if !found {
		c.JSON(http.StatusBadRequest, gin.H{"error": "account not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params["password"]))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "accout or password error"})
		return
	}

	payload, payloadErr := jwt.GenPayload(*user)
	if payloadErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{})
		return
	}
	tokenString := jwt.Encoder(payload)
	jwt.OnJwtDispatch(payload)

	c.Header("Authorization", "Bearer "+tokenString)
	c.JSON(http.StatusOK, gin.H{"status": "login success"})
}
