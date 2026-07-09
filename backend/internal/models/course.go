package models

import (
	"time"
	"github.com/google/uuid"
)

type Course struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Code        string    `gorm:"uniqueIndex;not null" json:"code"`
	Title       string    `gorm:"not null" json:"title"`
	Credit      int       `json:"credit"`
	Department  string    `json:"department"`
	Semester    int       `json:"semester"`
	TeacherID   uuid.UUID `gorm:"type:uuid;index" json:"teacher_id"`
	Teacher     Faculty   `gorm:"foreignKey:TeacherID" json:"teacher,omitempty"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (Course) TableName() string {
	return "courses"
}

type SyllabusTopic struct {
	ID         uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CourseID   uuid.UUID  `gorm:"type:uuid;index;not null" json:"course_id"`
	Course     Course     `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	Title      string     `gorm:"not null" json:"title"`
	IsCovered  bool       `gorm:"default:false" json:"is_covered"`
	CoveredAt  *time.Time `json:"covered_at,omitempty"`
	AddedBy    uuid.UUID  `gorm:"type:uuid" json:"added_by"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
}

func (SyllabusTopic) TableName() string {
	return "syllabus_topics"
}
