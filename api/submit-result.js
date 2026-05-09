// api/submit-result.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client = null;

// ... (Остальной код и CORS_HEADERS остаются без изменений)
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Vercel-Forwarded-For'
};
// ...

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

module.exports = async (req, res) => {
    // 1. Обработка CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, CORS_HEADERS);
        return res.end();
    }

    // Применяем CORS-заголовки к ответу
    Object.keys(CORS_HEADERS).forEach(key => {
        res.setHeader(key, CORS_HEADERS[key]);
    });

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    }

    try {
        const quizData = req.body;

        // Проверка необходимых полей
        if (!quizData || typeof quizData.score === 'undefined' || typeof quizData.correctAnswers === 'undefined' || typeof quizData.maxStreak === 'undefined') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, message: 'Missing required fields in request body.' }));
        }

        const dbClient = await connectToDatabase();
        // Убедитесь, что имя базы данных "Cluster0" верное!
        const database = dbClient.db("Cluster0");
        const collection = database.collection("QuizResults");

        const resultToSave = {
            userName: quizData.userName || 'Аноним', // <--- НОВОЕ ПОЛЕ
            score: quizData.score,
            correctAnswers: quizData.correctAnswers,
            maxStreak: quizData.maxStreak,
            timestamp: new Date()
        };

        const result = await collection.insertOne(resultToSave);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, insertedId: result.insertedId }));

    } catch (error) {
        console.error("Database error:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }));
    }
};
