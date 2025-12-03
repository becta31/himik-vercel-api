// api/submit-result.js

const { MongoClient } = require('mongodb');

// Строка подключения берется из переменной окружения Vercel
const uri = process.env.MONGO_URI;
// Используем одну глобальную переменную для клиента
let client = null;

// Настройка CORS-заголовков
const CORS_HEADERS = {
    // Разрешаем доступ с любого домена
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Vercel-Forwarded-For'
};

// Функция для подключения к базе данных
async function connectToDatabase() {
    if (!uri) {
        throw new Error("MONGO_URI environment variable is not set.");
    }
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

// Основной обработчик запроса
export default async (req, res) => {
    // 1. Обработка OPTIONS-запроса (preflight check)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, CORS_HEADERS);
        return res.end();
    }

    // 2. Применяем CORS-заголовки к ответу
    Object.keys(CORS_HEADERS).forEach(key => {
        res.setHeader(key, CORS_HEADERS[key]);
    });

    // 3. Проверка метода
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    }

    try {
        // 4. Подключение к базе данных
        const dbClient = await connectToDatabase();
        const database = dbClient.db("Cluster0"); // Название базы данных
        const collection = database.collection("QuizResults"); // Название коллекции/таблицы

        // 5. Извлечение данных из тела запроса
        const { score, correctAnswers, maxStreak } = req.body;

        // 6. Валидация данных
        if (typeof score !== 'number' || typeof correctAnswers !== 'number' || typeof maxStreak !== 'number') {
             res.writeHead(400, { 'Content-Type': 'application/json' });
             return res.end(JSON.stringify({ success: false, message: 'Invalid data format' }));
        }

        // 7. Данные для сохранения
        const resultDocument = {
            score: score,
            correctAnswers: correctAnswers,
            maxStreak: maxStreak,
            timestamp: new Date()
        };

        // 8. Сохранение в базу
        const result = await collection.insertOne(resultDocument);

        // 9. Успешный ответ
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Result saved', id: result.insertedId }));

    } catch (error) {
        console.error("Database error:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }));
    }
};