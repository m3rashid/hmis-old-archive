package main

import (
	"fmt"
	"log"
	"os"
	"sync"
	"syscall"
	"time"

	"github.com/judwhite/go-svc"
	"github.com/m3rashid/hms/args"
	"github.com/m3rashid/hms/db"
	"github.com/m3rashid/hms/models"
	"github.com/m3rashid/hms/redis"
	"github.com/m3rashid/hms/routers"
)

type program struct {
	wg   sync.WaitGroup
	quit chan struct{}
}

func (p *program) Init(env svc.Environment) error {
	redis.ConnectRedis()
	return nil
}

func (p *program) Start() error {
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
	case "seed":
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

	fmt.Println("Server Started 🏄")
	return nil
}

func (p *program) Stop() error {
	fmt.Println("\nserver stoping")
	time.Sleep(time.Duration(1) * time.Second)
	return nil
}

func main() {
	prg := &program{}
	if err := svc.Run(prg, os.Interrupt); err != nil {
		log.Fatal(err)
	}
}
