package modules

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hmis/modules/base"
)

func InitRouter(sig ...os.Signal) {
	router := SetupRouter()
	if len(sig) == 0 {
		sig = []os.Signal{syscall.SIGINT, syscall.SIGTERM}
	}
	signalChan := make(chan os.Signal, 1)
	go func() {
		router.Run(fmt.Sprintf(":%v", os.Getenv("HTTP_PORT")))
	}()
	signal.Notify(signalChan, sig...)
}

func SetupRouter() *gin.Engine {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.ExposeHeaders = []string{"Authorization"}
	config.AllowCredentials = true
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	router.GET("/ping", base.PingHandler)

	return router
}
