package influx

import (
	"fmt"
	"log"

	"github.com/cbrake/influxdbhelper/v2"
	client "github.com/influxdata/influxdb1-client/v2"
	"github.com/m3rashid/hms/config"
)

var influxURL = fmt.Sprintf("http://%s:%s", config.GetEnv("INFLUXDB_HOST"), config.GetEnv("INFLUXDB_PORT"))
var db = config.GetEnv("INFLUXDB_DB")
var c influxdbhelper.Client

func ConnectInflux() {
	c, _ = influxdbhelper.NewClient(influxURL, "", "", "ns")
}

func Init() (err error) {
	q := client.NewQuery("CREATE DATABASE "+db, "", "")
	res, err := c.Query(q)
	if err != nil {
		return err
	}
	if res.Error() != nil {
		log.Println("dbhelper db initialize failed")
		return res.Error()
	}

	return nil
}

func WritePoints(points []interface{}) {
	c = c.UseDB(db)
	for _, p := range points {
		err := c.WritePoint(p)
		if err != nil {
			log.Fatal("Error writing point: ", err)
		}
	}
}

func ReadPoints(query string, points interface{}) interface{} {
	err := c.UseDB(db).DecodeQuery(query, &points)
	if err != nil {
		log.Fatal("Query error: ", err)
	}

	return points
}
