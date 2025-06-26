package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitPostgres() error {
	connStr := os.Getenv("POSTGRES_URL")
	dbpool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		return fmt.Errorf("ошибка подключения к PostgreSQL: %v", err)
	}
	DB = dbpool
	fmt.Println("✅ Успешно подключено к PostgreSQL")
	return nil
}
