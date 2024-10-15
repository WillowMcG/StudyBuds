require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

const express = require('express');
const dayjs = require('dayjs');
const axios = require('axios');
const app = express();

const playFabTitleId = process.env.PLAYFAB_TITLE_ID;
const playFabSecretKey = process.env.PLAYFAB_SECRET_KEY;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

