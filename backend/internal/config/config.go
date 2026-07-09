package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)

type Config struct {
	DBHost      string
	DBUser      string
	DBPassword  string
	DBName      string
	DBPort      string
	JWTSecret   string
	JWTExpire   string
	Port        string
	FrontendURL string
}

var AppConfig Config

func LoadConfig() {
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ Warning: .env file not found, using environment variables")
	}

	AppConfig = Config{
		DBHost:      getEnv("DB_HOST", "localhost"),
		DBUser:      getEnv("DB_USER", "postgres"),
		DBPassword:  getEnv("DB_PASSWORD", "password"),
		DBName:      getEnv("DB_NAME", "academiaos"),
		DBPort:      getEnv("DB_PORT", "5432"),
		JWTSecret:   getEnv("JWT_SECRET", "your-secret-key"),
		JWTExpire:   getEnv("JWT_EXPIRE", "24h"),
		Port:        getEnv("PORT", "8080"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:3000"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
