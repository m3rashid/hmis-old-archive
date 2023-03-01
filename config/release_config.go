package config

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func GetEnv(env string) string {
	return fmt.Sprintf("%v", viper.Get(env))
}

func init() {
	gin.SetMode(gin.ReleaseMode)
	viper.AutomaticEnv()
}
