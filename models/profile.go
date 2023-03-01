package models

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
