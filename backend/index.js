require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('./studybuds-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
db.goOnline();

const express = require('express');
const dayjs = require('dayjs');
const axios = require('axios');
const app = express(); 

//const playFabTitleId = process.env.PLAYFAB_TITLE_ID;
//const playFabSecretKey = process.env.PLAYFAB_SECRET_KEY;

/* ----- HELPER FUNCTIONS ----- */

function getDebugData(dataSnap, req, messageVal='Hello from backend!') {
    var dataVal = dataSnap.val();
    var debugData = { 
        message: messageVal,
        paramaters: req.params,
        urlArgs: req.query,
        data: dataVal
    };
    return debugData
}



/* ----- API - GETS ----- */

// Retrievess an existing user (Needs userId from Auth)
app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.get(`/api/users/:userId`, (req, res) => {
    const userId = req.params.userId;

    var ref = db.ref(`dev/users/${userId}`)
    //console.log(ref.once("value"))

    ref.get().then(function(dataSnap) {
        var debData = getDebugData(dataSnap, req);
        res.json(debData);
    })
});



/* ----- API - PATCH ----- */

// Adds a new user (Needs userId from Auth, userName, and userEmail)
app.patch(`/api/users/:userId`, (req, res) => {
    const userId = req.params.userId;
    const userName = req.query.userName;
    const userEmail = req.query.userEmail;
    

    var existanceRef = db.ref(`dev/users/${userId}`)
    var newPlaceRef = db.ref("dev/users")

    var newUserData = {[userId]: {
        name: userName,
        email: userEmail,
        coursesEnrolled: {
            tutorial: {
                name: "Tutorial"
            }
        }
    }};

    existanceRef.get().then(function(dataSnap) {
        var debData = getDebugData(dataSnap, req);
        if (debData.data != null) {
            debData.message = "ERROR";
            debData.data = "User with that ID/Email already exists";
            res.json(debData);
        }
        else{
            newPlaceRef.update(newUserData).then(function() {
                existanceRef.get().then(function(innerDataSnap) {
                    var innerDebData = getDebugData(innerDataSnap, req);
                    res.json(innerDebData);
                })
            })
        }
    })
});



/* ----- API - DELETE ----- */

// Deletes a new user (Needs userId from Auth)
app.delete(`/api/users/:userId`, (req, res) => {
    const userId = req.params.userId;

    var ref = db.ref(`dev/users/${userId}`)
    //console.log(ref.once("value"))

    ref.get().then(function(dataSnap) {
        var debData = getDebugData(dataSnap, req);
        if (debData.data == null) {
            debData.message = "ERROR";
            debData.data = "User with that ID/Email doesn't exist!";
            res.json(debData);
        }
        else{
            ref.remove().then(function() {
                res.json(debData);
            })
        }
    })
});

// POST (create new), GET, PUT (send final goal), PATCH (sends only specific changes), DELETE

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

