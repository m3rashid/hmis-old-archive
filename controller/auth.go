package controller

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hmis/db"
	"github.com/m3rashid/hmis/jwt"
	"github.com/m3rashid/hmis/models"
	"github.com/m3rashid/hmis/params"
	"golang.org/x/crypto/bcrypt"
)

func CurrentUser(c *gin.Context) *models.User {
	sub, _ := c.Get("sub")
	user, _ := models.FindUserByColum("id", sub)
	return user
}

func AuthPingHandler(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}

func ChangePasswordHandler(c *gin.Context) {
	sub, _ := c.Get("sub")
	var change params.ChangePassword
	var oldPassword string
	var user *models.User

	if err := c.ShouldBind(&change); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if change.Password != change.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"status": "password and password confirm not match"})
		return
	}

	var subData jwt.PayloadSub
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

	user, _ = models.FindUserByColum("id", sub)
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
	var payload jwt.Payload
	db.DB.Model(&user).Updates(models.User{Password: password})
	payload, err = jwt.GenPayload(*user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	jwt.RevokeLastJwt(payload)

	c.JSON(http.StatusOK, gin.H{"status": "update password success"})
}
