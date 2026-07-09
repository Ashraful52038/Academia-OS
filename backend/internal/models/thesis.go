package models

import (
	"time"
	"github.com/google/uuid"
)

type Thesis struct {
	ID           uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	StudentID    uuid.UUID  `gorm:"type:uuid;index;not null" json:"student_id"`
	Student      Student    `gorm:"foreignKey:StudentID" json:"student,omitempty"`
	SupervisorID uuid.UUID  `gorm:"type:uuid;index;not null" json:"supervisor_id"`
	Supervisor   Faculty    `gorm:"foreignKey:SupervisorID" json:"supervisor,omitempty"`
	Topic        string     `gorm:"not null" json:"topic"`
	Status       string     `gorm:"default:'active';check:status IN ('active','completed','withdrawn')" json:"status"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

func (Thesis) TableName() string {
	return "theses"
}

type Milestone struct {
	ID          uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	ThesisID    uuid.UUID  `gorm:"type:uuid;index;not null" json:"thesis_id"`
	Thesis      Thesis     `gorm:"foreignKey:ThesisID" json:"thesis,omitempty"`
	Name        string     `gorm:"not null" json:"name"`
	Order       int        `json:"order"`
	Status      string     `gorm:"default:'pending';check:status IN ('pending','reviewed','needs_revision','completed')" json:"status"`
	Feedback    string     `json:"feedback,omitempty"`
	SubmittedAt *time.Time `json:"submitted_at,omitempty"`
	ReviewedAt  *time.Time `json:"reviewed_at,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

func (Milestone) TableName() string {
	return "milestones"
}
