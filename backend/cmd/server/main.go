package main

import (
	"log"
	"academiaos-backend/internal/config"
	"academiaos-backend/internal/database"
	"academiaos-backend/internal/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load configuration
	config.LoadConfig()

	// Connect to database
	database.ConnectDB()

	// Create Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{config.AppConfig.FrontendURL},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAuthorization},
	}))

	// Setup routes
	routes.SetupRoutes(e)

	// Start server
	log.Printf("🚀 Server running on port %s", config.AppConfig.Port)
	e.Logger.Fatal(e.Start(":" + config.AppConfig.Port))
}
