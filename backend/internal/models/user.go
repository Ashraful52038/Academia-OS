package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name         string    `gorm:"not null" json:"name"`
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	PasswordHash string    `gorm:"column:password_hash;not null" json:"-"`
	Role         string    `gorm:"not null;check:role IN ('teacher','student','admin')" json:"role"`
	Phone        string    `json:"phone"`
	IsActive     bool      `gorm:"default:true" json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func (User) TableName() string {
	return "users"
}

type Faculty struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid;uniqueIndex" json:"user_id"`
	User        User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Designation string    `json:"designation"`
	Office      string    `json:"office"`
	Department  string    `json:"department"`
	Expertise   []string  `gorm:"type:text[]" json:"expertise"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (Faculty) TableName() string {
	return "faculty"
}

type Student struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID     uuid.UUID `gorm:"type:uuid;uniqueIndex" json:"user_id"`
	User       User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	StudentID  string    `gorm:"uniqueIndex;not null" json:"student_id"`
	Department string    `json:"department"`
	Semester   int       `json:"semester"`
	CGPA       float64   `gorm:"default:0" json:"cgpa"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func (Student) TableName() string {
	return "students"
}
