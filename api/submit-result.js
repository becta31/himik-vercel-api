// api/submit-result.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client = null;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Vercel-Forwarded-For'
};

async function connectToDatabase() {
    try {
        if (!uri) {
            throw new Error('MONGO_URI is not defined');
        }

        if (!client) {
            const newClient = new MongoClient(uri);
            await newClient.connect();
            client = newClient;
        }

        // Проверяем, что соединение живое
        await client.db("admin").command({ ping: 1 });

        return client;

    } catch (error) {
        console.error("MongoDB connection error:", error);

        if (client) {
            try {
                await client.close();
            } catch (closeError) {
                console.error("Error closing MongoDB client:", closeError);
            }
        }

        client = null;
        throw error;
    }
}

module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(200, CORS_HEADERS);
        return res.end();
    }

    Object.keys(CORS_HEADERS).forEach(key => {
        res.setHeader(key, CORS_HEADERS[key]);
    });

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: 'Method Not Allowed'
        }));
    }

    try {
        const quizData = req.body;

        if (
            !quizData ||
            typeof quizData.score === 'undefined' ||
            typeof quizData.correctAnswers === 'undefined' ||
            typeof quizData.maxStreak === 'undefined'
        ) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: 'Missing required fields in request body.'
            }));
        }

        const dbClient = await connectToDatabase();

        // База данных и коллекция
        const database = dbClient.db("Cluster0");
        const collection = database.collection("QuizResults");

        const resultToSave = {
            userName: quizData.userName || 'Аноним',
            score: Number(quizData.score),
            correctAnswers: Number(quizData.correctAnswers),
            maxStreak: Number(quizData.maxStreak),
            timestamp: new Date()
        };

        const result = await collection.insertOne(resultToSave);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true,
            insertedId: result.insertedId
        }));

    } catch (error) {
        console.error("Database error:", error);

        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }));
    }
};
