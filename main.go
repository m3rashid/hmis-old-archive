package main

import (
	"fmt"
	"log"
	"os"
	"syscall"

	"github.com/m3rashid/hms/args"
	"github.com/m3rashid/hms/config"
	"github.com/m3rashid/hms/db"
	"github.com/m3rashid/hms/models"
	"github.com/m3rashid/hms/routers"
)

func Start() error {
	args.ParseCmd()
	switch args.Cmd.DB {
	case "create":
		fmt.Println("creating database")
		db.Create()
		syscall.Kill(syscall.Getpid(), syscall.SIGINT)
	case "migrate":
		fmt.Println("migrating tables")
		db.Migrate(args.Cmd.GIN_ENV, &models.User{})
		syscall.Kill(syscall.Getpid(), syscall.SIGINT)
	case "drop":
		fmt.Println("droping database")
		if args.Cmd.TABLE != "" {
			db.Open("")
			db.DB.Migrator().DropTable(args.Cmd.TABLE)
		} else {
			db.Drop()
		}
		syscall.Kill(syscall.Getpid(), syscall.SIGINT)
	default:
		fmt.Println("server starting...")
		db.Open("")
		routers.InitRouter(os.Interrupt)
	}

	fmt.Println("Server Started 🏄 on PORT:", config.GetEnv("HTTP_PORT"))
	return nil
}

func main() {
	if err := Start(); err != nil {
		log.Fatal(err)
	}
}
