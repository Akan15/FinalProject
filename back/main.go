package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"bytes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Feedback struct {
	ID      int       `json:"id"`
	Name    string    `json:"name"`
	IIN     string    `json:"iin"`
	Message string    `json:"message"`
	Date    time.Time `json:"date"`
}

func main() {
	_ = godotenv.Load()

	if err := InitPostgres(); err != nil {
		log.Fatal("PostgreSQL init error:", err)
	}

	go StartBot()

	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/api/feedback", handleFeedback)
	r.GET("/api/feedback", getFeedbacks)

	r.GET("/api/faqs", getFAQs)
	r.GET("/api/features", getFeatures)
	r.GET("/api/news", getNews)

	r.Run(":8080")
	select {} // чтобы main не завершался
}

func handleFeedback(c *gin.Context) {
	var fb Feedback
	if err := c.ShouldBindJSON(&fb); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fb.Date = time.Now()

	query := `INSERT INTO feedback (name, iin, message, date) VALUES ($1, $2, $3, $4)`
	_, err := DB.Exec(context.Background(), query, fb.Name, fb.IIN, fb.Message, fb.Date)
	if err != nil {
		log.Printf("Failed to insert feedback: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось сохранить"})
		return
	}

	msg := "Новая заявка обратной связи!\n"
	msg += "Имя: " + fb.Name + "\n"
	msg += "ИИН: " + fb.IIN + "\n"
	msg += "Сообщение: " + fb.Message
	sendTelegramNotificationToAll(msg)

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func getFeedbacks(c *gin.Context) {
	query := `SELECT id, name, iin, message, date FROM feedback ORDER BY date DESC`
	rows, err := DB.Query(context.Background(), query)

	if err != nil {
		log.Printf("Query feedbacks error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения данных"})
		return
	}
	defer rows.Close()

	var feedbacks []Feedback
	for rows.Next() {
		var fb Feedback
		if err := rows.Scan(&fb.ID, &fb.Name, &fb.IIN, &fb.Message, &fb.Date); err != nil {
			log.Printf("Scan feedback error: %v", err)
			continue
		}
		feedbacks = append(feedbacks, fb)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Rows final error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения данных"})
		return
	}

	c.JSON(http.StatusOK, feedbacks)
}

func getFAQs(c *gin.Context) {
	faqs, err := GetAllFAQs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, faqs)
}

func getFeatures(c *gin.Context) {
	features, err := GetAllFeatures()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, features)
}

func getNews(c *gin.Context) {
	news, err := GetAllNews()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, news)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func sendTelegramNotificationToAll(msg string) {
	botToken := os.Getenv("TELEGRAM_BOT_TOKEN")
	chatIDs := os.Getenv("TELEGRAM_CHAT_IDS")
	if botToken == "" || chatIDs == "" {
		return
	}
	for _, chatID := range strings.Split(chatIDs, ",") {
		chatID = strings.TrimSpace(chatID)
		url := "https://api.telegram.org/bot" + botToken + "/sendMessage"
		body, _ := json.Marshal(map[string]string{
			"chat_id": chatID,
			"text":    msg,
		})
		http.Post(url, "application/json", bytes.NewBuffer(body))
	}
}
