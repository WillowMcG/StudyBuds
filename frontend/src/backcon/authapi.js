const baseUrl = "http://localhost:3001/api/auth"

// Doesn't work yet
async function addNewAccount(email, password) {
    // TO BE IMPLEMENTED. CALL THIS THEN CALL createNewUserData IN databaseapi.js
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'PATCH',
        body: JSON.stringify({email, password})
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

async function getUserCred(email, password) {
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${baseUrl}?userEmail=${email}&userPass=${password}`);
    xhr.send();
    */
    
    // Referenced example https://www.scaler.com/topics/nodejs/node-js-fetch/
    
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}?userEmail=${email}&userPass=${password}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}


export { addNewAccount, getUserCred };