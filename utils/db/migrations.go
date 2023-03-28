package db

var createSexEnum = `CREATE TYPE sex AS ENUM ('MALE','FEMALE','OTHERS');`
var createRoleEnum = `CREATE TYPE role AS ENUM ('DOCTOR','ADMIN','RECEPTIONIST','PHARMACIST','INVENTORY_MANAGER','CO_ADMIN','PATIENT','OTHER');`
var createMaritalStatusEnum = `CREATE TYPE maritalStatus as ENUM ('SINGLE','MARRIED','DIVORCED','WIDOWED');`

var InitialMigrations = []string{createSexEnum, createRoleEnum, createMaritalStatusEnum}
