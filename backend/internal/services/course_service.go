package services

import (
	"errors"
	"time"
	"academiaos-backend/internal/database"
	"academiaos-backend/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CourseService struct{}

func NewCourseService() *CourseService {
	return &CourseService{}
}

func (s *CourseService) GetTeacherCourses(teacherID string) ([]models.Course, error) {
	var courses []models.Course
	if err := database.DB.Where("teacher_id = ?", teacherID).Find(&courses).Error; err != nil {
		return nil, err
	}
	return courses, nil
}

func (s *CourseService) StartClass(courseID, teacherID string, date, startTime time.Time) (*models.ClassSession, error) {
	var course models.Course
	if err := database.DB.Where("id = ? AND teacher_id = ?", courseID, teacherID).First(&course).Error; err != nil {
		return nil, errors.New("course not found or unauthorized")
	}

	qrSeed := uuid.New().String()
	session := models.ClassSession{
		CourseID:  uuid.MustParse(courseID),
		TeacherID: uuid.MustParse(teacherID),
		Date:      date,
		StartTime: time.Date(date.Year(), date.Month(), date.Day(), startTime.Hour(), startTime.Minute(), 0, 0, time.Local),
			Status:    "ongoing",
		QRSeed:    qrSeed,
	}

	if err := database.DB.Create(&session).Error; err != nil {
		return nil, err
	}

	return &session, nil
}

func (s *CourseService) AddSyllabusTopic(courseID, userID, title string) (*models.SyllabusTopic, error) {
	topic := models.SyllabusTopic{
		CourseID: uuid.MustParse(courseID),
		Title:    title,
		AddedBy:  uuid.MustParse(userID),
	}

	if err := database.DB.Create(&topic).Error; err != nil {
		return nil, err
	}

	return &topic, nil
}

func (s *CourseService) UpdateTopicCovered(topicID string) error {
	return database.DB.Model(&models.SyllabusTopic{}).
		Where("id = ?", topicID).
		Updates(map[string]interface{}{
			"is_covered": true,
			"covered_at": gorm.Expr("NOW()"),
		}).Error
}
