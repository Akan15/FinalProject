package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

// --- State Structs ---

type AddFAQState struct {
	Step       int
	QuestionRU string
	AnswerRU   string
	QuestionKZ string
	AnswerKZ   string
	QuestionEN string
	AnswerEN   string
	Category   string
}

type EditFAQState struct {
	ID         int
	Step       int
	QuestionRU string
	AnswerRU   string
	QuestionKZ string
	AnswerKZ   string
	QuestionEN string
	AnswerEN   string
	Category   string
}

type AddNewsState struct {
	Step     int
	TitleRU  string
	TitleKZ  string
	TitleEN  string
	Link     string
	Position int
}

type EditNewsState struct {
	ID       int
	Step     int
	TitleRU  string
	TitleKZ  string
	TitleEN  string
	Link     string
	Position int
}

type AddFeatureState struct {
	Step     int
	TitleRU  string
	TitleKZ  string
	TitleEN  string
	Position int
}

type EditFeatureState struct {
	ID       int
	Step     int
	TitleRU  string
	TitleKZ  string
	TitleEN  string
	Position int
}

// --- State Maps ---

var faqAddStates = make(map[int64]*AddFAQState)
var faqEditStates = make(map[int64]*EditFAQState)
var newsAddStates = make(map[int64]*AddNewsState)
var newsEditStates = make(map[int64]*EditNewsState)
var featureAddStates = make(map[int64]*AddFeatureState)
var featureEditStates = make(map[int64]*EditFeatureState)

// --- Bot ---

func sendMessage(bot *tgbotapi.BotAPI, chatID int64, text string) {
	msg := tgbotapi.NewMessage(chatID, text)
	if _, err := bot.Send(msg); err != nil {
		log.Printf("Error sending message to chatID %d: %v", chatID, err)
	}
}

func sendMessageWithMarkdown(bot *tgbotapi.BotAPI, chatID int64, text string) {
	msg := tgbotapi.NewMessage(chatID, text)
	msg.ParseMode = "Markdown"
	if _, err := bot.Send(msg); err != nil {
		log.Printf("Error sending markdown message to chatID %d: %v", chatID, err)
	}
}

func StartBot() {
	botToken := os.Getenv("TELEGRAM_BOT_TOKEN")
	if botToken == "" {
		log.Fatal("TELEGRAM_BOT_TOKEN not set")
	}
	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		panic(err)
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60
	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		if update.Message != nil {
			go handleUpdate(bot, update)
		}
	}
}

func handleUpdate(bot *tgbotapi.BotAPI, update tgbotapi.Update) {
	defer func() {
		if r := recover(); r != nil {
			log.Printf("‼️ Panic recovered in handleUpdate: %v", r)
		}
	}()

	chatID := update.Message.Chat.ID
	text := update.Message.Text

	if strings.HasPrefix(text, "/") {
		delete(faqAddStates, chatID)
		delete(faqEditStates, chatID)
		delete(newsAddStates, chatID)
		delete(newsEditStates, chatID)
		delete(featureAddStates, chatID)
		delete(featureEditStates, chatID)

		switch {
		case strings.HasPrefix(text, "/help"):
			sendHelpMessage(bot, chatID)
		case text == "/addfaq":
			faqAddStates[chatID] = &AddFAQState{Step: 1}
			sendMessage(bot, chatID, "✍️ Введи вопрос (RU):")
		case strings.HasPrefix(text, "/editfaq"):
			handleEditFAQCommand(bot, chatID, text)
		case strings.HasPrefix(text, "/deletefaq"):
			handleDeleteCommand(bot, chatID, text, "FAQ", DeleteFAQByID)
		case text == "/listfaq":
			handleListFAQs(bot, chatID)
		case strings.HasPrefix(text, "/getfaq"):
			handleGetFAQCommand(bot, chatID, text)
		case text == "/addnews":
			newsAddStates[chatID] = &AddNewsState{Step: 1}
			sendMessage(bot, chatID, "📰 Введи заголовок (RU):")
		case strings.HasPrefix(text, "/editnews"):
			handleEditNewsCommand(bot, chatID, text)
		case strings.HasPrefix(text, "/deletenews"):
			handleDeleteCommand(bot, chatID, text, "новость", DeleteNewsByID)
		case text == "/listnews":
			handleListNews(bot, chatID)
		case strings.HasPrefix(text, "/getnews"):
			handleGetNewsCommand(bot, chatID, text)
		case text == "/addfeature":
			featureAddStates[chatID] = &AddFeatureState{Step: 1}
			sendMessage(bot, chatID, "✨ Введи заголовок (RU):")
		case strings.HasPrefix(text, "/editfeature"):
			handleEditFeatureCommand(bot, chatID, text)
		case strings.HasPrefix(text, "/deletefeature"):
			handleDeleteCommand(bot, chatID, text, "фичу", DeleteFeatureByID)
		case text == "/listfeatures":
			handleListFeatures(bot, chatID)
		case strings.HasPrefix(text, "/getfeature"):
			handleGetFeatureCommand(bot, chatID, text)
		case strings.HasPrefix(text, "/movefeature"):
			handleMoveFeatureCommand(bot, chatID, text)
		case strings.HasPrefix(text, "/movenews"):
			handleMoveNewsCommand(bot, chatID, text)
		}
		return
	}

	handleFSM(bot, chatID, text)
}

func handleFSM(bot *tgbotapi.BotAPI, chatID int64, text string) {
	if state, ok := faqAddStates[chatID]; ok {
		processAddFAQState(bot, chatID, text, state)
	} else if state, ok := faqEditStates[chatID]; ok {
		processEditFAQState(bot, chatID, text, state)
	} else if state, ok := newsAddStates[chatID]; ok {
		processAddNewsState(bot, chatID, text, state)
	} else if state, ok := newsEditStates[chatID]; ok {
		processEditNewsState(bot, chatID, text, state)
	} else if state, ok := featureAddStates[chatID]; ok {
		processAddFeatureState(bot, chatID, text, state)
	} else if state, ok := featureEditStates[chatID]; ok {
		processEditFeatureState(bot, chatID, text, state)
	}
}

func sendHelpMessage(bot *tgbotapi.BotAPI, chatID int64) {
	helpText := "*📌 Доступные команды:*\n\n" +
		"*Новости*\n" +
		"`/addnews` 📰 Добавить новость\n" +
		"`/editnews {id}` ✏️ Редактировать новость\n" +
		"`/deletenews {id}` 🗑️ Удалить новость\n" +
		"`/getnews {id}` 📖 Посмотреть новость по ID\n" +
		"`/listnews` 🗂️ Показать список всех новостей\n" +
		"`/movenews {id} {новая_позиция}` 🔄 Переместить новость\n\n" +
		"*Фишки (features)*\n" +
		"`/addfeature` ✨ Добавить фишку\n" +
		"`/editfeature {id}` ✏️ Редактировать фишку\n" +
		"`/deletefeature {id}` 🗑️ Удалить фишку\n" +
		"`/listfeatures` 📃 Показать список фишек\n" +
		"`/getfeature {id}` 🔍 Посмотреть фишку по ID\n" +
		"`/movefeature {id} {новая_позиция}` 🔄 Переместить фишку\n\n" +
		"*Прочее*\n" +
		"`/help` ℹ️ Показать это сообщение"
	sendMessageWithMarkdown(bot, chatID, helpText)
}

func handleDeleteCommand(bot *tgbotapi.BotAPI, chatID int64, text, entityName string, deleteFunc func(id int) error) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, fmt.Sprintf("❗ Используй: /delete%s {id}", entityName))
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	err = deleteFunc(id)
	if err != nil {
		sendMessage(bot, chatID, fmt.Sprintf("❌ Ошибка при удалении %s", entityName))
	} else {
		sendMessage(bot, chatID, fmt.Sprintf("🗑️ %s с ID %d успешно удален(а)", entityName, id))
	}
}

// --- FAQ Handlers ---
func handleListFAQs(bot *tgbotapi.BotAPI, chatID int64) {
	faqs, err := GetAllFAQs()
	if err != nil || len(faqs) == 0 {
		sendMessage(bot, chatID, "❌ Список FAQ пуст или произошла ошибка")
		return
	}
	var msgText strings.Builder
	for _, f := range faqs {
		msgText.WriteString(fmt.Sprintf("ID: %d - %s\n", f.ID, f.QuestionRU))
	}
	sendMessage(bot, chatID, msgText.String())
}

func handleGetFAQCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Используй: /getfaq {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	faq, err := GetFAQByID(id)
	if err != nil {
		sendMessage(bot, chatID, "❌ FAQ не найден")
		return
	}
	msg := fmt.Sprintf("ID: %d\nRU: %s\nRU_A: %s\nKZ: %s\nKZ_A: %s\nEN: %s\nEN_A: %s\nКатегория: %s",
		faq.ID, faq.QuestionRU, faq.AnswerRU, faq.QuestionKZ, faq.AnswerKZ, faq.QuestionEN, faq.AnswerEN, faq.Category)
	sendMessage(bot, chatID, msg)
}

func handleEditFAQCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Используй: /editfaq {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	faqEditStates[chatID] = &EditFAQState{ID: id, Step: 1}
	sendMessage(bot, chatID, "✍️ Введи новый вопрос (RU):")
}

func processAddFAQState(bot *tgbotapi.BotAPI, chatID int64, text string, state *AddFAQState) {
	switch state.Step {
	case 1:
		state.QuestionRU = text
		sendMessage(bot, chatID, "✍️ Введи ответ (RU):")
		state.Step++
	case 2:
		state.AnswerRU = text
		sendMessage(bot, chatID, "✍️ Введи вопрос (KZ):")
		state.Step++
	case 3:
		state.QuestionKZ = text
		sendMessage(bot, chatID, "✍️ Введи ответ (KZ):")
		state.Step++
	case 4:
		state.AnswerKZ = text
		sendMessage(bot, chatID, "✍️ Введи вопрос (EN):")
		state.Step++
	case 5:
		state.QuestionEN = text
		sendMessage(bot, chatID, "✍️ Введи ответ (EN):")
		state.Step++
	case 6:
		state.AnswerEN = text
		sendMessage(bot, chatID, "📂 Введи категорию:")
		state.Step++
	case 7:
		state.Category = text
		_, err := AddFAQ(FAQ{
			QuestionRU: state.QuestionRU, AnswerRU: state.AnswerRU,
			QuestionKZ: state.QuestionKZ, AnswerKZ: state.AnswerKZ,
			QuestionEN: state.QuestionEN, AnswerEN: state.AnswerEN,
			Category: state.Category,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при добавлении FAQ")
		} else {
			sendMessage(bot, chatID, "✅ FAQ успешно добавлен!")
		}
		delete(faqAddStates, chatID)
	}
}

func processEditFAQState(bot *tgbotapi.BotAPI, chatID int64, text string, state *EditFAQState) {
	switch state.Step {
	case 1:
		state.QuestionRU = text
		sendMessage(bot, chatID, "✍️ Введи новый ответ (RU):")
		state.Step++
	case 2:
		state.AnswerRU = text
		sendMessage(bot, chatID, "✍️ Введи новый вопрос (KZ):")
		state.Step++
	case 3:
		state.QuestionKZ = text
		sendMessage(bot, chatID, "✍️ Введи новый ответ (KZ):")
		state.Step++
	case 4:
		state.AnswerKZ = text
		sendMessage(bot, chatID, "✍️ Введи новый вопрос (EN):")
		state.Step++
	case 5:
		state.QuestionEN = text
		sendMessage(bot, chatID, "✍️ Введи новый ответ (EN):")
		state.Step++
	case 6:
		state.AnswerEN = text
		sendMessage(bot, chatID, "📂 Введи новую категорию:")
		state.Step++
	case 7:
		state.Category = text
		err := UpdateFAQ(FAQ{
			ID:         state.ID,
			QuestionRU: state.QuestionRU, AnswerRU: state.AnswerRU,
			QuestionKZ: state.QuestionKZ, AnswerKZ: state.AnswerKZ,
			QuestionEN: state.QuestionEN, AnswerEN: state.AnswerEN,
			Category: state.Category,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при обновлении FAQ")
		} else {
			sendMessage(bot, chatID, "✅ FAQ успешно обновлён")
		}
		delete(faqEditStates, chatID)
	}
}

// --- News Handlers & FSM ---
func handleListNews(bot *tgbotapi.BotAPI, chatID int64) {
	newsList, err := GetAllNews()
	if err != nil || len(newsList) == 0 {
		sendMessage(bot, chatID, "❌ Список новостей пуст или произошла ошибка")
		return
	}
	var msg strings.Builder
	for _, n := range newsList {
		msg.WriteString(fmt.Sprintf("ID: %d | Pos: %d\nRU: %s\nKZ: %s\nEN: %s\nLink: %s\n\n",
			n.ID, n.Position, n.TitleRU, n.TitleKZ, n.TitleEN, n.Link))
	}
	sendMessage(bot, chatID, msg.String())
}

func handleGetNewsCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Формат: /getnews {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	news, err := GetNewsByID(id)
	if err != nil {
		sendMessage(bot, chatID, "❌ Новость не найдена")
		return
	}
	msg := fmt.Sprintf("ID: %d | Pos: %d\nRU: %s\nKZ: %s\nEN: %s\nLink: %s",
		news.ID, news.Position, news.TitleRU, news.TitleKZ, news.TitleEN, news.Link)
	sendMessage(bot, chatID, msg)
}

func handleEditNewsCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Используй: /editnews {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	newsEditStates[chatID] = &EditNewsState{ID: id, Step: 1}
	sendMessage(bot, chatID, "✍️ Введи новый заголовок (RU):")
}

func processAddNewsState(bot *tgbotapi.BotAPI, chatID int64, text string, state *AddNewsState) {
	switch state.Step {
	case 1:
		state.TitleRU = text
		sendMessage(bot, chatID, "📰 Введи заголовок (KZ):")
		state.Step++
	case 2:
		state.TitleKZ = text
		sendMessage(bot, chatID, "📰 Введи заголовок (EN):")
		state.Step++
	case 3:
		state.TitleEN = text
		sendMessage(bot, chatID, "🔗 Введи ссылку:")
		state.Step++
	case 4:
		state.Link = text
		sendMessage(bot, chatID, "📦 Введи позицию (число):")
		state.Step++
	case 5:
		pos, err := strconv.Atoi(text)
		if err != nil {
			sendMessage(bot, chatID, "❗ Позиция должна быть числом")
			return
		}
		state.Position = pos
		_, err = AddNews(News{
			TitleRU: state.TitleRU, TitleKZ: state.TitleKZ, TitleEN: state.TitleEN,
			Link: state.Link, Position: state.Position,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при добавлении новости")
		} else {
			sendMessage(bot, chatID, "✅ Новость успешно добавлена")
		}
		delete(newsAddStates, chatID)
	}
}

func processEditNewsState(bot *tgbotapi.BotAPI, chatID int64, text string, state *EditNewsState) {
	switch state.Step {
	case 1:
		state.TitleRU = text
		sendMessage(bot, chatID, "✍️ Введи новый заголовок (KZ):")
		state.Step++
	case 2:
		state.TitleKZ = text
		sendMessage(bot, chatID, "✍️ Введи новый заголовок (EN):")
		state.Step++
	case 3:
		state.TitleEN = text
		sendMessage(bot, chatID, "🔗 Введи новую ссылку:")
		state.Step++
	case 4:
		state.Link = text
		sendMessage(bot, chatID, "📦 Введи новую позицию (число):")
		state.Step++
	case 5:
		pos, err := strconv.Atoi(text)
		if err != nil {
			sendMessage(bot, chatID, "❗ Позиция должна быть числом")
			return
		}
		state.Position = pos
		err = UpdateNews(News{
			ID: state.ID, TitleRU: state.TitleRU, TitleKZ: state.TitleKZ,
			TitleEN: state.TitleEN, Link: state.Link, Position: state.Position,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при обновлении новости")
		} else {
			sendMessage(bot, chatID, "✅ Новость успешно обновлена")
		}
		delete(newsEditStates, chatID)
	}
}

// --- Feature Handlers & FSM ---
func handleListFeatures(bot *tgbotapi.BotAPI, chatID int64) {
	features, err := GetAllFeatures()
	if err != nil || len(features) == 0 {
		sendMessage(bot, chatID, "❌ Не удалось получить список фишек")
		return
	}
	var msg strings.Builder
	for _, f := range features {
		msg.WriteString(fmt.Sprintf("ID: %d | Pos: %d\nRU: %s\nKZ: %s\nEN: %s\n\n",
			f.ID, f.Position, f.TitleRU, f.TitleKZ, f.TitleEN))
	}
	sendMessage(bot, chatID, msg.String())
}

func handleGetFeatureCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Fields(text)
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Формат: /getfeature {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	feature, err := GetFeatureByID(id)
	if err != nil {
		sendMessage(bot, chatID, "❌ Фишка не найдена")
		return
	}
	msg := fmt.Sprintf("ID: %d | Pos: %d\nRU: %s\nKZ: %s\nEN: %s",
		feature.ID, feature.Position, feature.TitleRU, feature.TitleKZ, feature.TitleEN)
	sendMessage(bot, chatID, msg)
}

func handleEditFeatureCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Split(text, " ")
	if len(parts) != 2 {
		sendMessage(bot, chatID, "❗ Используй: /editfeature {id}")
		return
	}
	id, err := strconv.Atoi(parts[1])
	if err != nil {
		sendMessage(bot, chatID, "❗ ID должен быть числом.")
		return
	}
	featureEditStates[chatID] = &EditFeatureState{ID: id, Step: 1}
	sendMessage(bot, chatID, "✍️ Введи новый заголовок (RU):")
}

func processAddFeatureState(bot *tgbotapi.BotAPI, chatID int64, text string, state *AddFeatureState) {
	switch state.Step {
	case 1:
		state.TitleRU = text
		sendMessage(bot, chatID, "✨ Введи заголовок (KZ):")
		state.Step++
	case 2:
		state.TitleKZ = text
		sendMessage(bot, chatID, "✨ Введи заголовок (EN):")
		state.Step++
	case 3:
		state.TitleEN = text
		sendMessage(bot, chatID, "📦 Введи позицию (число):")
		state.Step++
	case 4:
		pos, err := strconv.Atoi(text)
		if err != nil {
			sendMessage(bot, chatID, "❗ Позиция должна быть числом")
			return
		}
		state.Position = pos
		_, err = AddFeature(Feature{
			TitleRU: state.TitleRU, TitleKZ: state.TitleKZ,
			TitleEN: state.TitleEN, Position: state.Position,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при добавлении фишки")
		} else {
			sendMessage(bot, chatID, "✅ Фишка успешно добавлена")
		}
		delete(featureAddStates, chatID)
	}
}

func processEditFeatureState(bot *tgbotapi.BotAPI, chatID int64, text string, state *EditFeatureState) {
	switch state.Step {
	case 1:
		state.TitleRU = text
		sendMessage(bot, chatID, "✍️ Введи новый заголовок (KZ):")
		state.Step++
	case 2:
		state.TitleKZ = text
		sendMessage(bot, chatID, "✍️ Введи новый заголовок (EN):")
		state.Step++
	case 3:
		state.TitleEN = text
		sendMessage(bot, chatID, "📦 Введи новую позицию (число):")
		state.Step++
	case 4:
		pos, err := strconv.Atoi(text)
		if err != nil {
			sendMessage(bot, chatID, "❗ Позиция должна быть числом")
			return
		}
		state.Position = pos
		err = UpdateFeature(Feature{
			ID: state.ID, TitleRU: state.TitleRU, TitleKZ: state.TitleKZ,
			TitleEN: state.TitleEN, Position: state.Position,
		})
		if err != nil {
			sendMessage(bot, chatID, "❌ Ошибка при обновлении фишки")
		} else {
			sendMessage(bot, chatID, "✅ Фишка успешно обновлена")
		}
		delete(featureEditStates, chatID)
	}
}

// --- Перемещение фичи на другую позицию ---
func handleMoveFeatureCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Fields(text)
	if len(parts) != 3 {
		sendMessage(bot, chatID, "❗ Формат: /movefeature {id} {новая_позиция}")
		return
	}
	id, err1 := strconv.Atoi(parts[1])
	newPos, err2 := strconv.Atoi(parts[2])
	if err1 != nil || err2 != nil {
		sendMessage(bot, chatID, "❌ Неверный ID или позиция")
		return
	}

	var currentPos int
	err := DB.QueryRow(context.Background(), `SELECT position FROM features WHERE id = $1`, id).Scan(&currentPos)
	if err != nil {
		sendMessage(bot, chatID, "❌ Фишка не найдена")
		return
	}

	if newPos == currentPos {
		sendMessage(bot, chatID, "ℹ️ Фишка уже на этой позиции")
		return
	}

	tx, err := DB.Begin(context.Background())
	if err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при старте транзакции")
		return
	}
	defer tx.Rollback(context.Background())

	var query string
	if newPos < currentPos {
		query = `UPDATE features SET position = position + 1 WHERE position >= $1 AND position < $2`
	} else {
		query = `UPDATE features SET position = position - 1 WHERE position <= $1 AND position > $2`
	}
	if _, err := tx.Exec(context.Background(), query, newPos, currentPos); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при обновлении позиций")
		return
	}

	if _, err := tx.Exec(context.Background(), `UPDATE features SET position = $1 WHERE id = $2`, newPos, id); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при обновлении позиции фишки")
		return
	}

	if err := tx.Commit(context.Background()); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при сохранении изменений")
		return
	}

	sendMessage(bot, chatID, fmt.Sprintf("📦 Фишка #%d перемещена на позицию %d", id, newPos))
	return
}

// --- Перемещение новости на другую позицию ---
func handleMoveNewsCommand(bot *tgbotapi.BotAPI, chatID int64, text string) {
	parts := strings.Fields(text)
	if len(parts) != 3 {
		sendMessage(bot, chatID, "❗ Формат: /movenews {id} {новая_позиция}")
		return
	}
	id, err1 := strconv.Atoi(parts[1])
	newPos, err2 := strconv.Atoi(parts[2])
	if err1 != nil || err2 != nil {
		sendMessage(bot, chatID, "❌ Неверный ID или позиция")
		return
	}

	var currentPos int
	err := DB.QueryRow(context.Background(), `SELECT position FROM newses WHERE id = $1`, id).Scan(&currentPos)
	if err != nil {
		sendMessage(bot, chatID, "❌ Новость не найдена")
		return
	}

	if newPos == currentPos {
		sendMessage(bot, chatID, "ℹ️ Новость уже на этой позиции")
		return
	}

	tx, err := DB.Begin(context.Background())
	if err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при старте транзакции")
		return
	}
	defer tx.Rollback(context.Background())

	var query string
	if newPos < currentPos {
		query = `UPDATE newses SET position = position + 1 WHERE position >= $1 AND position < $2`
	} else {
		query = `UPDATE newses SET position = position - 1 WHERE position <= $1 AND position > $2`
	}
	if _, err := tx.Exec(context.Background(), query, newPos, currentPos); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при обновлении позиций")
		return
	}

	if _, err := tx.Exec(context.Background(), `UPDATE newses SET position = $1 WHERE id = $2`, newPos, id); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при обновлении позиции новости")
		return
	}

	if err := tx.Commit(context.Background()); err != nil {
		sendMessage(bot, chatID, "❌ Ошибка при сохранении изменений")
		return
	}

	sendMessage(bot, chatID, fmt.Sprintf("📦 Новость #%d перемещена на позицию %d", id, newPos))
	return
}
