// api/submit-result.js

// 1. Импорт клиента MongoDB
const { MongoClient } = require('mongodb');

// 2. Строка подключения берется из переменной окружения
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// 3. Настройка CORS-заголовков (ОЧЕНЬ ВАЖНО)
// Ваш фронтенд находится на GitHub Pages (другой домен),
// поэтому Vercel должен явно разрешить ему отправлять запросы.
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*', // Разрешаем доступ с любого домена (для простоты)
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

// 4. Основной обработчик запроса
export default async (req, res) => {
    // 4а. Обработка OPTIONS-запроса (preflight check от браузера)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, CORS_HEADERS);
        return res.end();
    }

    // Применяем CORS-заголовки к ответу
    res.writeHead(200, CORS_HEADERS);

    // Разрешаем только POST-запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        // Подключение к базе данных
        await client.connect();
        const database = client.db("HIMIK_DB"); // Название базы данных
        const collection = database.collection("QuizResults"); // Название коллекции/таблицы

        // Извлечение данных из тела запроса
        // req.body содержит данные, отправленные из quiz.html
        const { score, correctAnswers, maxStreak } = req.body;

        // Добавляем метаданные
        const resultDocument = {
            score: score,
            correctAnswers: correctAnswers,
            maxStreak: maxStreak,
            timestamp: new Date()
        };

        // Сохранение в базу
        const result = await collection.insertOne(resultDocument);

        // Успешный ответ
        res.status(200).json({ success: true, message: 'Result saved', id: result.insertedId });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    // В Vercel нет необходимости вручную закрывать клиент.
    // Функция "умирает" после выполнения.
};