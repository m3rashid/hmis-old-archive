package ws

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/m3rashid/hmis/modules/auth"
)

type OptionalProps struct {
	user *auth.User
}

func ServeWs (pool *Pool, ctx *gin.Context, optionalParams ...OptionalProps) {
	fmt.Println("WebSocket Endpoint Hit")
	w,r := ctx.Writer, ctx.Request
	conn, err := Upgrade(w, r)
	if err != nil {
		log.Println(err)
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
	}
	client := &Client{
		Conn:  conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func ServeWsAuth (pool *Pool, ctx *gin.Context, authRequired bool) {
	if authRequired {
		user := auth.CurrentUser(ctx);
		ServeWs(pool, ctx, OptionalProps{ user: user });
	} else {
		ServeWs(pool, ctx)
	}
}

// func SetupRoutes() {
// 	pool := NewPool()
// 	go pool.Start()
// 	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
// 		serveWs(pool, w, r)
// 	})
// }
