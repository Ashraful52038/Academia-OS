package middleware

import (
	"net/http"
	"strings"
	"academiaos-backend/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return c.JSON(http.StatusUnauthorized, map[string]interface{}{
					"success": false,
					"error":   "Authorization header required",
				})
			}

			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || parts[0] != "Bearer" {
				return c.JSON(http.StatusUnauthorized, map[string]interface{}{
					"success": false,
					"error":   "Invalid token format",
				})
			}

			tokenString := parts[1]
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, echo.NewHTTPError(http.StatusUnauthorized, "Invalid signing method")
				}
				return []byte(config.AppConfig.JWTSecret), nil
			})

			if err != nil {
				return c.JSON(http.StatusUnauthorized, map[string]interface{}{
					"success": false,
					"error":   "Invalid token",
				})
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				c.Set("userID", claims["id"])
				c.Set("userEmail", claims["email"])
				c.Set("userRole", claims["role"])
				return next(c)
			}

			return c.JSON(http.StatusUnauthorized, map[string]interface{}{
				"success": false,
				"error":   "Invalid token claims",
			})
		}
	}
}
