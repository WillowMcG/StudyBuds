const baseUrl = "http://localhost:3001/api/"

// Enter userid  (from auth) to get user data
async function getUserData(uid){
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}users/${uid}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

async function createNewUserData(uid, name, email, grade, progressData={}){
    // TO BE IMPLEMENTED. CALL addNewAccount IN authapi.js THEN CALL THIS
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'PATCH',
        body: JSON.stringify({name, email, grade, progressData})
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}users/${uid}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
    // TO BE IMPLEMENTED. CALL addNewAccount IN authapi.js THEN CALL THIS
}

// Pass in the grade found in the user data from above
async function getGradeData(grade){
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}courses/${grade}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

// Pass in data gotten from menuing and gradedata above for generated question
async function getQuestion(grade, courseId, topicId, questionId){
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}questions/${grade}/${courseId}/${topicId}/${questionId}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

// returns just {percent: (whole number percent from 0 to 100)}
async function getPercentOfTopicDone(userId, courseId, topicId){
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}topicPercent/${userId}/${courseId}/${topicId}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

// questionResponse is just a given questionData from above with a selAns property
// the selAns property is whichever answer the student has chosen. 
// Returns whether question was gotten right and marks as complete automatically if so
// (MARKING AND SAVING OF COMPLETION STILL NOT YET FINISHED)
async function checkQuestion(grade, courseId, topicId, questionId, questionResponse, userId){
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'PATCH',
        body: JSON.stringify({...questionResponse, uid: userId})
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}questions/${grade}/${courseId}/${topicId}/${questionId}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

export { getUserData, createNewUserData, getGradeData, getQuestion, checkQuestion, getPercentOfTopicDone };