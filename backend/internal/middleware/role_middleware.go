package middleware

import (
	"net/http"
	"github.com/labstack/echo/v4"
)

func RoleMiddleware(allowedRoles ...string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role, exists := c.Get("userRole").(string)
			if !exists {
				return c.JSON(http.StatusUnauthorized, map[string]interface{}{
					"success": false,
					"error":   "Unauthorized",
				})
			}

			for _, allowed := range allowedRoles {
				if role == allowed {
					return next(c)
				}
			}

			return c.JSON(http.StatusForbidden, map[string]interface{}{
				"success": false,
				"error":   "Insufficient permissions",
			})
		}
	}
}
