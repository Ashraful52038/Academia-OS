package models

import (
	"time"
	"github.com/google/uuid"
)

type ClassSession struct {
	ID           uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CourseID     uuid.UUID  `gorm:"type:uuid;index;not null" json:"course_id"`
	Course       Course     `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	TeacherID    uuid.UUID  `gorm:"type:uuid;index;not null" json:"teacher_id"`
	Teacher      User       `gorm:"foreignKey:TeacherID" json:"teacher,omitempty"`
	Date         time.Time  `gorm:"not null;index" json:"date"`
	StartTime    time.Time  `gorm:"not null" json:"start_time"`
	EndTime      *time.Time `json:"end_time,omitempty"`
	Duration     int        `json:"duration"`
	QRSeed       string     `gorm:"column:qr_seed" json:"qr_seed"`
	Status       string     `gorm:"default:'scheduled';check:status IN ('scheduled','ongoing','completed')" json:"status"`
	TotalTopics  int        `json:"total_topics"`
	CoveredTopics int       `json:"covered_topics"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

func (ClassSession) TableName() string {
	return "class_sessions"
}

type Attendance struct {
	ID          uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	SessionID   uuid.UUID  `gorm:"type:uuid;index;not null" json:"session_id"`
	Session     ClassSession `gorm:"foreignKey:SessionID" json:"session,omitempty"`
	StudentID   uuid.UUID  `gorm:"type:uuid;index;not null" json:"student_id"`
	Student     Student    `gorm:"foreignKey:StudentID" json:"student,omitempty"`
	CheckedInAt time.Time  `gorm:"not null" json:"checked_in_at"`
	IsPresent   bool       `gorm:"default:true" json:"is_present"`
	CreatedAt   time.Time  `json:"created_at"`
}

func (Attendance) TableName() string {
	return "attendance"
}
