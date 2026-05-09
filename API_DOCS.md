# API Документация проекта «ХИМИК»

Проект использует Vercel Serverless Functions для сохранения и получения результатов викторины.

Базовый адрес API:

```text
https://himik-vercel-api.vercel.app/api
```

---

## POST `/api/submit-result`

Сохраняет результат прохождения викторины в MongoDB.

### Request body

```json
{
  "userName": "Денис",
  "score": 80,
  "correctAnswers": 8,
  "maxStreak": 4
}
```

### Поля запроса

| Поле | Тип | Обязательное | Описание |
|---|---|---|---|
| `userName` | string | Нет | Имя пользователя для таблицы лидеров. Если не передано, используется `Аноним`. |
| `score` | number | Да | Итоговое количество очков. |
| `correctAnswers` | number | Да | Количество правильных ответов. |
| `maxStreak` | number | Да | Максимальная серия правильных ответов подряд. |

### Успешный ответ

```json
{
  "success": true,
  "insertedId": "69ff9a8790934297ffc729ed"
}
```

### Ошибка валидации

```json
{
  "success": false,
  "message": "Missing required fields in request body."
}
```

### Ошибка сервера

```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error message"
}
```

---

## GET `/api/get-top-results`

Возвращает топ-10 результатов викторины.

### Пример запроса

```text
GET https://himik-vercel-api.vercel.app/api/get-top-results
```

### Успешный ответ

```json
{
  "success": true,
  "results": [
    {
      "_id": "69ff9a8790934297ffc729ed",
      "userName": "Денис",
      "score": 80,
      "correctAnswers": 8,
      "maxStreak": 4,
      "timestamp": "2026-05-09T20:00:00.000Z"
    }
  ]
}
```

### Поля ответа

| Поле | Тип | Описание |
|---|---|---|
| `_id` | string | ID записи в MongoDB. |
| `userName` | string | Имя пользователя. |
| `score` | number | Итоговые очки. |
| `correctAnswers` | number | Количество правильных ответов. |
| `maxStreak` | number | Максимальная серия. |
| `timestamp` | string | Дата и время сохранения результата. |

---

## Переменные окружения

Для работы API в Vercel должна быть настроена переменная:

```text
MONGO_URI
```

Пример формата:

```text
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Важно: строку подключения нельзя хранить в публичном коде репозитория.

---

## Проверка работы API

### Проверить получение рейтинга

Открыть в браузере:

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

После прохождения викторины в консоли браузера должен появиться лог:

```text
✅ Результат викторины успешно сохранен
```

После этого новый результат должен появиться в:

```text
https://himik-vercel-api.vercel.app/api/get-top-results
```
