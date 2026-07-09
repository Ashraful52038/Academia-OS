package services

import (
	"errors"
	"time"
	"academiaos-backend/internal/config"
	"academiaos-backend/internal/database"
	"academiaos-backend/internal/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct{}

func NewAuthService() *AuthService {
	return &AuthService{}
}

func (s *AuthService) Login(email, password string) (string, interface{}, error) {
	var user models.User
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", nil, errors.New("invalid email or password")
		}
		return "", nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return "", nil, errors.New("invalid email or password")
	}

	token, err := s.generateToken(user)
	if err != nil {
		return "", nil, err
	}

	userData := map[string]interface{}{
		"id":    user.ID,
		"name":  user.Name,
		"email": user.Email,
		"role":  user.Role,
	}

	return token, userData, nil
}

func (s *AuthService) Register(name, email, password, role, phone string) (*models.User, error) {
	var existingUser models.User
	if err := database.DB.Where("email = ?", email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := models.User{
		Name:         name,
		Email:        email,
		PasswordHash: string(hashedPassword),
		Role:         role,
		Phone:        phone,
		IsActive:     true,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	if role == "student" {
		student := models.Student{
			UserID:     user.ID,
			StudentID:  "STU" + user.ID.String()[:8],
			Department: "CSE",
			Semester:   1,
		}
		database.DB.Create(&student)
	} else if role == "teacher" {
		faculty := models.Faculty{
			UserID:      user.ID,
			Designation: "Lecturer",
			Department:  "CSE",
		}
		database.DB.Create(&faculty)
	}

	return &user, nil
}

func (s *AuthService) generateToken(user models.User) (string, error) {
	claims := jwt.MapClaims{
		"id":    user.ID.String(),
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.AppConfig.JWTSecret))
}
