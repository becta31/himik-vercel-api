// api/get-top-results.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client = null;

// ... (Остальной код и CORS_HEADERS остаются без изменений)
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};
// ...

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}

export default async (req, res) => {
    // Обработка OPTIONS-запроса (CORS preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, CORS_HEADERS);
        return res.end();
    }

    // Применяем CORS-заголовки к ответу
    Object.keys(CORS_HEADERS).forEach(key => {
        res.setHeader(key, CORS_HEADERS[key]);
    });

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    }

    try {
        const dbClient = await connectToDatabase();
        const database = dbClient.db("Cluster0");
        const collection = database.collection("QuizResults");

        const topResults = await collection.find({})
            .sort({ score: -1, timestamp: -1 }) // Сортируем по очкам, затем по времени
            .limit(10)
            .toArray();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, results: topResults }));

    } catch (error) {
        console.error("Database read error:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Internal Server Error' }));
    }
};