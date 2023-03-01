package models

import (
	"errors"
	"fmt"

	"github.com/m3rashid/hms/db"
	"gorm.io/gorm"
)

type User struct {
	Model,
	Name string
	Email       string `gorm:"index:idx_email,unique"`
	Password    string
	Permissions []string
}

func FindUserByEmail(email string) (*User, SearchResult) {
	var user User
	result := Result(db.DB.Where("email = ?", email).First(&user).Error)
	return &user, result

}

func FindUserByID(id string) (*User, SearchResult) {
	var user User
	result := Result(db.DB.Where("id = ?", id).First(&user).Error)
	return &user, result
}

func FindUserByColum(colum string, value interface{}) (*User, bool) {
	var user User
	qs := fmt.Sprintf("%s = ?", colum)
	err := db.DB.Where(qs, value).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}
