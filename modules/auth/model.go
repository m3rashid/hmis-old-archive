package auth

import (
	"errors"
	"fmt"

	"github.com/m3rashid/hmis/utils/db"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name        string
	Email       string `gorm:"index:idx_email,unique"`
	Password    string
	Permissions []string
}

type Address struct {
	Pincode             int
	State               string
	Country             string `gorm:"default:india"`
	Street              string
	BuildingHouseNumber string
	RoomNumber          string
}

type sexType string

const (
	MALE   sexType = "MALE"
	FEMALE sexType = "FEMALE"
	OTHERS sexType = "OTHERS"
)

type role string

const (
	DOCTOR        role = "DOCTOR"
	ADMIN         role = "ADMIN"
	RECEPTIONIST  role = "RECEPTIONIST"
	PHARMACIST    role = "PHARMACIST"
	INVENTORY_MGR role = "INVENTORY_MGR"
	CO_ADMIN      role = "CO_ADMIN"
	OTHER         role = "OTHER"
	PATIENT       role = "PATIENT"
)

type maritalStatus string

const (
	SINGLE   maritalStatus = "SINGLE"
	MARRIED  maritalStatus = "MARRIED"
	DIVORCED maritalStatus = "DIVORCED"
	WIDOWED  maritalStatus = "WIDOWED"
)

type ProfileCommons struct {
	User
	Address
	Contact       string
	Sex           sexType       `gorm:"type:sex"`
	Role          role          `gorm:"type:role"`
	MaritalStatus maritalStatus `gorm:"type:maritalStatus"`
}

type Profile struct {
	ProfileCommons
	Designation string
}

type PatientProfile struct {
	ProfileCommons
	// visits
}

func FindUserByEmail(email string) (*User, db.SearchResult) {
	var user User
	result := db.Result(db.DB.Where("email = ?", email).First(&user).Error)
	return &user, result

}

func FindUserByID(id string) (*User, db.SearchResult) {
	var user User
	result := db.Result(db.DB.Where("id = ?", id).First(&user).Error)
	return &user, result
}

func FindUserByColum(colum string, value interface{}) (*User, bool) {
	var user User
	qs := fmt.Sprintf("%s = ?", colum)
	err := db.DB.Where(qs, value).First(&user).Error
	return &user, errors.Is(err, gorm.ErrRecordNotFound)
}
