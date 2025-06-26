package main

import (
	"context"
	"log"
	"time"
)

// --- FAQ ---
type FAQ struct {
	ID         int       `json:"id"`
	QuestionRU string    `json:"question_ru"`
	AnswerRU   string    `json:"answer_ru"`
	QuestionKZ string    `json:"question_kz"`
	AnswerKZ   string    `json:"answer_kz"`
	QuestionEN string    `json:"question_en"`
	AnswerEN   string    `json:"answer_en"`
	Category   string    `json:"category"`
	CreatedAt  time.Time `json:"created_at"`
}

func GetAllFAQs() ([]FAQ, error) {
	query := `SELECT id, question_ru, answer_ru, question_kz, answer_kz, question_en, answer_en, category, created_at FROM faqs ORDER BY id`
	rows, err := DB.Query(context.Background(), query)
	if err != nil {
		log.Printf("Query all FAQs error: %v", err)
		return nil, err
	}
	defer rows.Close()

	var faqs []FAQ
	for rows.Next() {
		var f FAQ
		err := rows.Scan(&f.ID, &f.QuestionRU, &f.AnswerRU, &f.QuestionKZ, &f.AnswerKZ, &f.QuestionEN, &f.AnswerEN, &f.Category, &f.CreatedAt)
		if err != nil {
			log.Printf("Scan FAQ error: %v", err)
			continue
		}
		faqs = append(faqs, f)
	}
	return faqs, rows.Err()
}

func AddFAQ(f FAQ) (int, error) {
	query := `INSERT INTO faqs (question_ru, answer_ru, question_kz, answer_kz, question_en, answer_en, category, created_at)
			  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
	var id int
	err := DB.QueryRow(context.Background(), query, f.QuestionRU, f.AnswerRU, f.QuestionKZ, f.AnswerKZ, f.QuestionEN, f.AnswerEN, f.Category, time.Now()).Scan(&id)
	if err != nil {
		log.Printf("Unable to insert FAQ: %v\n", err)
		return 0, err
	}
	return id, nil
}

func GetFAQByID(id int) (FAQ, error) {
	var f FAQ
	query := `SELECT id, question_ru, answer_ru, question_kz, answer_kz, question_en, answer_en, category, created_at FROM faqs WHERE id = $1`
	err := DB.QueryRow(context.Background(), query, id).Scan(&f.ID, &f.QuestionRU, &f.AnswerRU, &f.QuestionKZ, &f.AnswerKZ, &f.QuestionEN, &f.AnswerEN, &f.Category, &f.CreatedAt)
	if err != nil {
		log.Printf("Unable to get FAQ by ID: %v\n", err)
		return f, err
	}
	return f, nil
}

func UpdateFAQ(f FAQ) error {
	query := `UPDATE faqs SET question_ru=$1, answer_ru=$2, question_kz=$3, answer_kz=$4, question_en=$5, answer_en=$6, category=$7 WHERE id=$8`
	_, err := DB.Exec(context.Background(), query, f.QuestionRU, f.AnswerRU, f.QuestionKZ, f.AnswerKZ, f.QuestionEN, f.AnswerEN, f.Category, f.ID)
	if err != nil {
		log.Printf("Unable to update FAQ: %v\n", err)
		return err
	}
	return nil
}

func DeleteFAQByID(id int) error {
	query := `DELETE FROM faqs WHERE id = $1`
	_, err := DB.Exec(context.Background(), query, id)
	if err != nil {
		log.Printf("Unable to delete FAQ: %v\n", err)
		return err
	}
	return nil
}

// --- Feature ---
type Feature struct {
	ID        int       `json:"id"`
	TitleRU   string    `json:"title_ru"`
	TitleKZ   string    `json:"title_kz"`
	TitleEN   string    `json:"title_en"`
	Position  int       `json:"position"`
	CreatedAt time.Time `json:"created_at"`
}

func GetAllFeatures() ([]Feature, error) {
	query := `SELECT id, title_ru, title_kz, title_en, position, created_at FROM features ORDER BY position`
	rows, err := DB.Query(context.Background(), query)
	if err != nil {
		log.Printf("Query all Features error: %v", err)
		return nil, err
	}
	defer rows.Close()

	var features []Feature
	for rows.Next() {
		var f Feature
		err := rows.Scan(&f.ID, &f.TitleRU, &f.TitleKZ, &f.TitleEN, &f.Position, &f.CreatedAt)
		if err != nil {
			log.Printf("Scan Feature error: %v", err)
			continue
		}
		features = append(features, f)
	}
	return features, rows.Err()
}

func AddFeature(f Feature) (int, error) {
	query := `INSERT INTO features (title_ru, title_kz, title_en, position, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	var id int
	err := DB.QueryRow(context.Background(), query, f.TitleRU, f.TitleKZ, f.TitleEN, f.Position, time.Now()).Scan(&id)
	if err != nil {
		log.Printf("Unable to insert feature: %v\n", err)
		return 0, err
	}
	return id, nil
}

func GetFeatureByID(id int) (Feature, error) {
	var f Feature
	query := `SELECT id, title_ru, title_kz, title_en, position, created_at FROM features WHERE id = $1`
	err := DB.QueryRow(context.Background(), query, id).Scan(&f.ID, &f.TitleRU, &f.TitleKZ, &f.TitleEN, &f.Position, &f.CreatedAt)
	if err != nil {
		log.Printf("Unable to get feature by ID: %v\n", err)
		return f, err
	}
	return f, nil
}

func UpdateFeature(f Feature) error {
	query := `UPDATE features SET title_ru=$1, title_kz=$2, title_en=$3, position=$4 WHERE id=$5`
	_, err := DB.Exec(context.Background(), query, f.TitleRU, f.TitleKZ, f.TitleEN, f.Position, f.ID)
	if err != nil {
		log.Printf("Unable to update feature: %v\n", err)
		return err
	}
	return nil
}

func DeleteFeatureByID(id int) error {
	query := `DELETE FROM features WHERE id = $1`
	_, err := DB.Exec(context.Background(), query, id)
	if err != nil {
		log.Printf("Unable to delete feature: %v\n", err)
		return err
	}
	return nil
}

// --- News ---
type News struct {
	ID        int       `json:"id"`
	TitleRU   string    `json:"title_ru"`
	TitleKZ   string    `json:"title_kz"`
	TitleEN   string    `json:"title_en"`
	Link      string    `json:"link"`
	Position  int       `json:"position"`
	CreatedAt time.Time `json:"created_at"`
}

func GetAllNews() ([]News, error) {
	query := `SELECT id, title_ru, title_kz, title_en, link, position, created_at FROM newses ORDER BY position`
	rows, err := DB.Query(context.Background(), query)
	if err != nil {
		log.Printf("Query all News error: %v", err)
		return nil, err
	}
	defer rows.Close()

	var news []News
	for rows.Next() {
		var n News
		err := rows.Scan(&n.ID, &n.TitleRU, &n.TitleKZ, &n.TitleEN, &n.Link, &n.Position, &n.CreatedAt)
		if err != nil {
			log.Printf("Scan News error: %v", err)
			continue
		}
		news = append(news, n)
	}
	return news, rows.Err()
}

func AddNews(n News) (int, error) {
	query := `INSERT INTO newses (title_ru, title_kz, title_en, link, position, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	var id int
	err := DB.QueryRow(context.Background(), query, n.TitleRU, n.TitleKZ, n.TitleEN, n.Link, n.Position, time.Now()).Scan(&id)
	if err != nil {
		log.Printf("Unable to insert news: %v\n", err)
		return 0, err
	}
	return id, nil
}

func GetNewsByID(id int) (News, error) {
	var n News
	query := `SELECT id, title_ru, title_kz, title_en, link, position, created_at FROM newses WHERE id = $1`
	err := DB.QueryRow(context.Background(), query, id).Scan(&n.ID, &n.TitleRU, &n.TitleKZ, &n.TitleEN, &n.Link, &n.Position, &n.CreatedAt)
	if err != nil {
		log.Printf("Unable to get news by ID: %v\n", err)
		return n, err
	}
	return n, nil
}

func UpdateNews(n News) error {
	query := `UPDATE newses SET title_ru=$1, title_kz=$2, title_en=$3, link=$4, position=$5 WHERE id=$6`
	_, err := DB.Exec(context.Background(), query, n.TitleRU, n.TitleKZ, n.TitleEN, n.Link, n.Position, n.ID)
	if err != nil {
		log.Printf("Unable to update news: %v\n", err)
		return err
	}
	return nil
}

func DeleteNewsByID(id int) error {
	query := `DELETE FROM newses WHERE id = $1`
	_, err := DB.Exec(context.Background(), query, id)
	if err != nil {
		log.Printf("Unable to delete news: %v\n", err)
		return err
	}
	return nil
}
