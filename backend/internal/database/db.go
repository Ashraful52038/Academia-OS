package database

import (
	"fmt"
	"log"
	"academiaos-backend/internal/config"
	"academiaos-backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Dhaka",
		config.AppConfig.DBHost,
		config.AppConfig.DBUser,
		config.AppConfig.DBPassword,
		config.AppConfig.DBName,
		config.AppConfig.DBPort,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	log.Println("✅ Database connected successfully!")

	// Auto Migrate
	if err := DB.AutoMigrate(
		&models.User{},
		&models.Faculty{},
		&models.Student{},
		&models.Course{},
		&models.SyllabusTopic{},
		&models.ClassSession{},
		&models.Attendance{},
		&models.Thesis{},
		&models.Milestone{},
		&models.Resource{},
		&models.QuestionBankItem{},
		&models.Notification{},
		&models.RoutineSlot{},
	); err != nil {
		log.Fatal("❌ Failed to migrate database:", err)
	}

	log.Println("✅ Database migration completed!")
}
