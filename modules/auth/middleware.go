package auth

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		bear := c.Request.Header.Get("Authorization")
		token := strings.Replace(bear, "Bearer ", "", 1)
		sub, err := Decoder(token)
		if err != nil {
			c.Abort()
			c.String(http.StatusUnauthorized, err.Error())
		} else {
			c.Set("sub", sub)
			c.Next()
		}
	}
}
