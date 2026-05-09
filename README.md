[![GitHub last commit](https://img.shields.io/github/last-commit/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api)
[![GitHub license](https://img.shields.io/github/license/becta31/himik-vercel-api?style=flat-square)](https://github.com/becta31/himik-vercel-api/blob/main/LICENSE)
[![Website](https://img.shields.io/website?up_message=online&up_color=green&down_message=offline&down_color=red&url=https%3A%2F%2Fhimik-vercel-api.vercel.app%2F&style=flat-square)](https://himik-vercel-api.vercel.app)

# 🧪 ХИМИК — интерактивный тренажёр по химии

**ХИМИК** — это образовательный веб-тренажёр для изучения химических элементов, прохождения викторины и сохранения результатов в таблицу лидеров.

Проект реализован как статическое веб-приложение с serverless API на Vercel и хранением результатов в MongoDB Atlas.

## 🔗 Демо

Открыть приложение:

```text
https://himik-vercel-api.vercel.app
```

Основные страницы:

```text
https://himik-vercel-api.vercel.app/
https://himik-vercel-api.vercel.app/study.html
https://himik-vercel-api.vercel.app/quiz.html
https://himik-vercel-api.vercel.app/quiz.html?show=leaderboard
```

---

## 📌 Возможности проекта

### 📚 Режим обучения

На странице `study.html` пользователь может:

- просматривать карточки химических элементов;
- искать элементы по названию или символу;
- фильтровать элементы по категориям;
- открывать подробную карточку элемента;
- смотреть атомный номер, массу, период, группу, электронную конфигурацию и описание.

### 🎯 Викторина

На странице `quiz.html` пользователь может:

- пройти викторину по химическим элементам;
- отвечать на вопросы разных типов;
- получать очки за правильные ответы;
- видеть количество правильных ответов;
- отслеживать серию правильных ответов подряд;
- сохранить результат после завершения викторины.

### 🏆 Таблица лидеров

Рейтинг работает через Vercel API и MongoDB Atlas.

После прохождения викторины результат отправляется в API:

```text
POST /api/submit-result
```

Затем таблица лидеров получает топ-10 результатов через API:

```text
GET /api/get-top-results
```

---

## 🛠 Технологический стек

| Часть проекта | Технологии |
|---|---|
| Frontend | HTML5, CSS, Tailwind CSS CDN, Vanilla JavaScript |
| Статические данные | `elements.json` |
| Backend | Node.js, Vercel Serverless Functions |
| Database | MongoDB Atlas |
| Hosting | Vercel |
| Version Control | GitHub |

---

## 🧩 Архитектура

Проект построен по простой serverless-схеме:

```mermaid
flowchart LR
    U[Пользователь] --> B[Браузер]
    B --> S[Страницы сайта<br/>index / study / quiz]
    S --> D[elements.json<br/>данные элементов]
    S --> API[Vercel API<br/>рейтинг]
    API --> DB[(MongoDB Atlas<br/>результаты викторины)]
```

Основная логика приложения находится на клиенте:

- отображение страниц;
- генерация вопросов;
- проверка ответов;
- поиск и фильтрация элементов;
- отображение таблицы лидеров.

Серверная часть используется только для динамических данных рейтинга:

- сохранение результата викторины;
- получение топ-10 результатов.

Подробное описание архитектуры находится в файле:

```text
ARCHITECTURE.md
```

---

## 📂 Структура проекта

```text
himik-vercel-api/
├── api/
│   ├── get-top-results.js
│   └── submit-result.js
├── API_DOCS.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── .gitignore
├── LICENSE
├── README.md
├── elements.json
├── index.html
├── package.json
├── quiz.html
└── study.html
```

### Основные файлы

| Файл | Назначение |
|---|---|
| `index.html` | Главная страница проекта |
| `study.html` | Режим обучения с карточками элементов |
| `quiz.html` | Викторина и таблица лидеров |
| `elements.json` | Статическая база химических элементов |
| `api/submit-result.js` | API для сохранения результата |
| `api/get-top-results.js` | API для получения таблицы лидеров |
| `package.json` | Зависимости Node.js для API |
| `.gitignore` | Исключения для Git |
| `API_DOCS.md` | Документация API |
| `ARCHITECTURE.md` | Архитектура проекта |

---

## 🚀 Как запустить локально

Проект можно открыть как обычный статический сайт, но из-за `fetch('elements.json')` лучше запускать его через локальный веб-сервер.

### Вариант 1 — через VS Code Live Server

1. Клонировать репозиторий:

```bash
git clone https://github.com/becta31/himik-vercel-api.git
```

2. Открыть папку проекта в VS Code.

3. Установить расширение:

```text
Live Server
```

4. Нажать:

```text
Go Live
```

### Вариант 2 — через Python

В папке проекта выполнить:

```bash
python -m http.server 8000
```

После этого открыть:

```text
http://localhost:8000
```

---

## ⚙️ Переменные окружения

Для работы API в Vercel нужна переменная окружения:

```text
MONGO_URI
```

Пример формата:

```text
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Важно:

- строку подключения нельзя хранить в коде;
- `MONGO_URI` должна быть добавлена в Vercel;
- после изменения переменной окружения нужно сделать redeploy проекта.

---

## 🔌 API

Проект использует два serverless-эндпоинта.

### Сохранение результата

```text
POST /api/submit-result
```

Пример тела запроса:

```json
{
  "userName": "Денис",
  "score": 80,
  "correctAnswers": 8,
  "maxStreak": 4
}
```

### Получение рейтинга

```text
GET /api/get-top-results
```

Пример ответа:

```json
{
  "success": true,
  "results": [
    {
      "_id": "...",
      "userName": "Денис",
      "score": 80,
      "correctAnswers": 8,
      "maxStreak": 4,
      "timestamp": "2026-05-09T20:00:00.000Z"
    }
  ]
}
```

Полная документация API находится в файле:

```text
API_DOCS.md
```

---

## 🔐 Безопасность

В проекте реализованы базовые меры безопасности:

- строка подключения к MongoDB хранится в переменной окружения `MONGO_URI`;
- `.env` и локальные служебные файлы исключены через `.gitignore`;
- имя пользователя ограничивается до 50 символов перед сохранением;
- имя пользователя экранируется перед выводом в таблице лидеров;
- API проверяет обязательные поля перед сохранением результата.

---

## 🧪 Проверка работоспособности

### Проверить API рейтинга

Открыть:

```text
https://himik-vercel-api.vercel.app/api/get-top-results
```

Ожидаемый ответ:

```json
{
  "success": true,
  "results": []
}
```

или список сохранённых результатов.

### Проверить сохранение результата

1. Открыть:

```text
https://himik-vercel-api.vercel.app/quiz.html
```

2. Пройти викторину до конца.

3. Проверить:

```text
https://himik-vercel-api.vercel.app/api/get-top-results
```

В массиве `results` должен появиться новый результат.

---

## 📄 Документация

- [Архитектура проекта](./ARCHITECTURE.md)
- [API Документация](./API_DOCS.md)
- [Руководство для участников](./CONTRIBUTING.md)

---

## 👤 Автор

**becta31**

GitHub: [@becta31](https://github.com/becta31)

---

## 📝 Лицензия

Проект распространяется под лицензией MIT. Подробнее см. файл [LICENSE](./LICENSE).
