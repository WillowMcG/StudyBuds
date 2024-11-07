require('dotenv').config();
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./studybuds-firebase-adminsdk.json');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

// use admin for db access
const db = admin.database();
db.goOnline();


const express = require('express');
const dayjs = require('dayjs');
const axios = require('axios');
const app = express(); 
const fireclient = require('firebase/app');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthCredential, getAuth,  } = require('firebase/auth');
app.use(cors());

const clientApp = fireclient.initializeApp(firebaseConfig);
const clientAuth = getAuth(clientApp);

require('firebase/auth')

// and client app for auth

//const playFabTitleId = process.env.PLAYFAB_TITLE_ID;
//const playFabSecretKey = process.env.PLAYFAB_SECRET_KEY;

/* ----- HELPER FUNCTIONS ----- */

function getDebugDataSnap(dataSnap, req, messageVal='Hello from backend! (Snap)') {
    var dataVal = dataSnap.val();
    var debugData = { 
        message: messageVal,
        paramaters: req.params,
        urlArgs: req.query,
        data: dataVal
    };
    return debugData
}


function getDebugDataUserJSON(userJSON, req, messageVal='Hello from backend! (Cred)') {
    var dataVal = userJSON;
    var debugData = { 
        message: messageVal,
        paramaters: req.params,
        urlArgs: req.query,
        data: { 
            uid: dataVal.uid, 
            providerData: dataVal.providerData
        }
    };
    return debugData
}

function getDebugDataErr(errorval, req, messageVal='There was a problem!') {
    var dataVal = errorval;
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
        var debData = getDebugDataSnap(dataSnap, req);
        res.json(debData);
    })
});

// ???
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// ???
app.get(`/api/auth`, (req, res) => {
    const userEmail = req.query.userEmail;
    const userPass = req.query.userPass;
    const userCredPromise = signInWithEmailAndPassword(clientAuth, userEmail, userPass);

    userCredPromise.then(function(userCred) {
        var debData = getDebugDataUserJSON(userCred.user.toJSON(), req);
        res.json(debData);
    }).catch(function(err) {
        var debData = getDebugDataErr(err, req);
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
        var debData = getDebugDataSnap(dataSnap, req);
        if (debData.data != null) {
            debData.message = "ERROR";
            debData.data = "User with that ID/Email already exists";
            res.json(debData);
        }
        else{
            newPlaceRef.update(newUserData).then(function() {
                existanceRef.get().then(function(innerDataSnap) {
                    var innerDebData = getDebugDataSnap(innerDataSnap, req);
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

