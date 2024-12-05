require('dotenv').config();
const cors = require('cors');

const questParsing = require('./questParsing.js');

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
app.use(express.json());

const clientApp = fireclient.initializeApp(firebaseConfig);
const clientAuth = getAuth(clientApp);

require('firebase/auth')

var questionCache = {}; // Just so I don't have to access questions every time and can just store it from grade query

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
        //var debData = getDebugDataSnap(dataSnap, req);
        //res.json(debData);
        var dataVal = dataSnap.val();
        res.json(dataVal);
    })
});

// Return all data (just clean questions to only have names)
app.get(`/api/courses/:grade`, (req, res) => {
    const grade = req.params.grade;

    if ((questionCache[grade] != null) && (questionCache[grade]["time"] + (15*60*1000) > Date.now())) {
        // This just gets data from that question
        
        var dataVal = { ["_fromCache"]: true, ...structuredClone(questionCache[grade]) };
        delete dataVal["time"];
        // Delete all question data from 
        for(let coursek in dataVal["courses"]) {
            for(let topick in dataVal["courses"][coursek]["topics"]) {
                for(let questk in dataVal["courses"][coursek]["topics"][topick]["questions"]) {
                    const qName = dataVal["courses"][coursek]["topics"][topick]["questions"][questk]["qName"];
                    dataVal["courses"][coursek]["topics"][topick]["questions"][questk] = {
                        qName: qName
                    };
                }
            }
        }

        res.json(dataVal);

    } else {
        ref = db.ref(`dev/grades/${grade}`)
        ref.get().then(function(dataSnap) {
            //var debData = getDebugDataSnap(dataSnap, req);
            //res.json(debData);
            var dataVal = dataSnap.val(); // THIS HAS A LOT, CLEANING IT HERE

            questionCache[grade] = { ["time"]: Date.now(), ...structuredClone(dataVal) };

            dataVal = {["_fromCache"]: false, ...dataVal}

            // Delete all question data from 
            for(let coursek in dataVal["courses"]) {
                for(let topick in dataVal["courses"][coursek]["topics"]) {
                    for(let questk in dataVal["courses"][coursek]["topics"][topick]["questions"]) {
                        const qName = dataVal["courses"][coursek]["topics"][topick]["questions"][questk]["qName"];
                        dataVal["courses"][coursek]["topics"][topick]["questions"][questk] = {
                            qName: qName
                        };
                    }
                }
            }
            
            res.json(dataVal);
        })
    }
    
});

app.get(`/api/questions/:grade/:courseId/:topicId/:questId`, (req, res) => {
    const grade = req.params.grade;
    const courseId = req.params.courseId;
    const topicId = req.params.topicId;
    const questId = req.params.questId;

    var ref = db.ref(`dev/grades/${grade}/courses/${courseId}/topics/${topicId}/questions/${questId}`)

    ref.get().then(function(dataSnap) {
        //var debData = getDebugDataSnap(dataSnap, req);
        //res.json(debData);
        var dataVal = dataSnap.val();
        res.json(questParsing.generateQuestion(structuredClone(dataVal)));
    });
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
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userGrade = req.body.grade;
    const progressData = req.body.progressData;

    var existanceRef = db.ref(`dev/users/${userId}`)
    var newPlaceRef = db.ref("dev/users")

    var newUserData = {[userId]: {
        name: userName,
        email: userEmail,
        grade: userGrade,
        progress: progressData
    }};

    // console.log(newUserData)

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

app.patch(`/api/auth`, (req, res) => {
    const userEmail = req.body["email"];
    const userPass = req.body["password"];
    const userCredPromise = createUserWithEmailAndPassword(clientAuth, userEmail, userPass);

    userCredPromise.then(function(userCred) {
        var debData = getDebugDataUserJSON(userCred.user.toJSON(), req);
        res.json(debData);
    }).catch(function(err) {
        var debData = getDebugDataErr(err, req);
        res.json(debData);
    })
});

app.patch(`/api/questions/:grade/:courseId/:topicId/:questId`, (req, res) => {
    const grade = req.params.grade;
    const courseId = req.params.courseId;
    const topicId = req.params.topicId;
    const questId = req.params.questId;
    var passedData = req.body;

    var ref = db.ref(`dev/grades/${grade}/courses/${courseId}/topics/${topicId}/questions/${questId}`)
    var newPlaceRef = db.ref(`dev/users/${passedData["uid"]}`)
    
    var newPointsData = {
        ["progress"]: {
            [courseId]: {
                [topicId]: {
                    [questId]: {
                        points: 1
                    }
                }
            }
        }
    };

    ref.get().then(function(dataSnap) {
        //var debData = getDebugDataSnap(dataSnap, req);
        //res.json(debData);
        var dataVal = dataSnap.val();
        var successData = questParsing.checkQuestion(dataVal, passedData);
        if (successData["passed"]) {
            newPlaceRef.update(newPointsData);
        }
        res.json(successData);
    });
});

/* ----- API - DELETE ----- */

// Clears a user's progress
app.delete(`/api/users/:userId`, (req, res) => {
    const userId = req.params.userId;

    var ref = db.ref(`dev/users/${userId}/progress`)
    //console.log(ref.once("value"))

    ref.get().then(function(dataSnap) {
        var debData = getDebugData(dataSnap, req);
        if (debData.data == null) {
            debData.message = "ERROR";
            debData.data = "User with that ID/Email doesn't exist!";
            res.json(debData);
        }
        else{
            ref.remove(function() {
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

