package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hms/models"
	"github.com/m3rashid/hms/utils"
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
	var oldEncryptedPassword string
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
		oldEncryptedPassword = user.Password

	}
	err := bcrypt.CompareHashAndPassword([]byte(oldEncryptedPassword), []byte(change.OriginPassword))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "origin password error"})
		return
	}

	//将新密码加密后保存
	hash, err := bcrypt.GenerateFromPassword([]byte(change.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//更新数据库 生成新token  注销老token
	password := string(hash)
	var payload jwt.Payload
	switch scp {
	case "user":
		utils.DB.Model(&user).Updates(models.User{Password: Password})
		payload = jwt.GenPayload("", "user", user.ID.String())
		jwt.RevokeLastJwt(payload)
	}

	//返回结果
	c.JSON(http.StatusOK, gin.H{"status": "update password success"})
}
