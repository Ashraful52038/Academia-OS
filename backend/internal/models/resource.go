package models

import (
	"time"
	"github.com/google/uuid"
)

type Resource struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CourseID    uuid.UUID `gorm:"type:uuid;index;not null" json:"course_id"`
	Course      Course    `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `json:"description"`
	FileURL     string    `gorm:"not null" json:"file_url"`
	FileType    string    `json:"file_type"`
	FileSize    int64     `json:"file_size"`
	UploadedBy  uuid.UUID `gorm:"type:uuid;not null" json:"uploaded_by"`
	Uploader    User      `gorm:"foreignKey:UploadedBy" json:"uploader,omitempty"`
	Downloads   int       `gorm:"default:0" json:"downloads"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (Resource) TableName() string {
	return "resources"
}

type QuestionBankItem struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	CourseID  uuid.UUID `gorm:"type:uuid;index;not null" json:"course_id"`
	Course    Course    `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	Year      int       `gorm:"not null" json:"year"`
	Semester  string    `json:"semester"`
	Type      string    `gorm:"not null;check:type IN ('question','solution')" json:"type"`
	Title     string    `json:"title"`
	FileURL   string    `gorm:"not null" json:"file_url"`
	UploadedBy uuid.UUID `gorm:"type:uuid" json:"uploaded_by"`
	CreatedAt time.Time `json:"created_at"`
}

func (QuestionBankItem) TableName() string {
	return "question_bank_items"
}

type Notification struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;index;not null" json:"user_id"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Title     string    `gorm:"not null" json:"title"`
	Body      string    `json:"body"`
	Type      string    `gorm:"check:type IN ('info','warning','success','error')" json:"type"`
	IsRead    bool      `gorm:"default:false" json:"is_read"`
	Link      string    `json:"link,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

func (Notification) TableName() string {
	return "notifications"
}

type RoutineSlot struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Day        string    `gorm:"not null" json:"day"`
	Period     int       `gorm:"not null" json:"period"`
	CourseID   uuid.UUID `gorm:"type:uuid;index" json:"course_id"`
	Course     Course    `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	Room       string    `json:"room"`
	Section    string    `json:"section"`
	IsConflict bool      `gorm:"default:false" json:"is_conflict"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func (RoutineSlot) TableName() string {
	return "routine_slots"
}
