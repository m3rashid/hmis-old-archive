package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hms/db"
	"github.com/m3rashid/hms/jwt"
	"github.com/m3rashid/hms/models"
	"golang.org/x/crypto/bcrypt"
)

func CurrentUser(c *gin.Context) *models.User {
	sub, _ := c.Get("sub")
	user, _ := models.FindUserByColum("id", sub)
	return user
}

func AuthPingHandler(c *gin.Context) {
	c.String(http.StatusOK, fmt.Sprintf("pong"))
}

func ChangePasswordHandler(c *gin.Context) {
	sub, _ := c.Get("sub")
	scp, _ := c.Get("scp")
	var change params.ChangePassword
	var oldPassword string
	var user *models.User

	if err := c.ShouldBind(&change); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if change.Password != change.PasswordConfirm {
		c.JSON(http.StatusBadRequest, gin.H{"status": "password and password confirm not match"})
		return
	}

	switch scp {
	case "user":
		user, _ = models.FindUserByColum("id", sub)
		oldPassword = user.Password

	}
	err := bcrypt.CompareHashAndPassword([]byte(oldPassword), []byte(change.OriginPassword))
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
	switch scp {
	case "user":
		db.DB.Model(&user).Updates(models.User{Password: password})
		payload, err = jwt.GenPayload("", "user", user.ID.String())
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		jwt.RevokeLastJwt(payload)
	}

	c.JSON(http.StatusOK, gin.H{"status": "update password success"})
}
