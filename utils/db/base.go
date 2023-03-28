package db

import (
	"errors"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID        uint  `gorm:"primaryKey"`
	CreatedAt int64 `gorm:"autoCreateTime"`
	UpdatedAt int64 `gorm:"autoUpdateTime"`
}

type SearchResult struct {
	Error  error
	Status int
}

const (
	ERROR     = -1
	FOUND     = 0
	NOT_FOUND = 1
)

func Result(err error) SearchResult {
	var status int
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			status = NOT_FOUND
		} else {
			status = ERROR
		}
	}
	return SearchResult{Error: err, Status: status}
}

func (r *SearchResult) Err() error {
	return r.Error
}

func (r *SearchResult) Found() bool {
	return r.Status == FOUND
}

func (r *SearchResult) NotFound() bool {
	return r.Status == NOT_FOUND
}

func (r *SearchResult) DBError() bool {
	return r.Status == ERROR
}
