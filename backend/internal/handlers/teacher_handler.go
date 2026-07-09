package handlers

import (
	"net/http"
	"time"
	"academiaos-backend/internal/services"
	"github.com/labstack/echo/v4"
)

type TeacherHandler struct {
	courseService *services.CourseService
}

func NewTeacherHandler() *TeacherHandler {
	return &TeacherHandler{
		courseService: services.NewCourseService(),
	}
}

func (h *TeacherHandler) GetCourses(c echo.Context) error {
	userID := c.Get("userID").(string)
	courses, err := h.courseService.GetTeacherCourses(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    courses,
	})
}

func (h *TeacherHandler) StartClass(c echo.Context) error {
	courseID := c.Param("id")
	userID := c.Get("userID").(string)

	var req struct {
		Date      string `json:"date"`
		StartTime string `json:"start_time"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"error":   "Invalid request",
		})
	}

	// Parse date and time
	date, _ := time.Parse("2006-01-02", req.Date)
	startTime, _ := time.Parse("15:04", req.StartTime)

	session, err := h.courseService.StartClass(courseID, userID, date, startTime)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    session,
	})
}

func (h *TeacherHandler) AddSyllabusTopic(c echo.Context) error {
	courseID := c.Param("id")
	userID := c.Get("userID").(string)

	var req struct {
		Title string `json:"title"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"error":   "Invalid request",
		})
	}

	topic, err := h.courseService.AddSyllabusTopic(courseID, userID, req.Title)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"error":   err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"success": true,
		"data":    topic,
	})
}
