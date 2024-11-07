const baseUrl = "http://localhost:3001/api/users"

// Doesn't work yet
async function getUserData(uid){
    const options = {
        method: 'GET'
    }

    var toRet;
    try{
        const response = await fetch(`${baseUrl}/${uid}`, options);
        toRet = await response.json();
    } catch (err) {
        toRet = err;
    }
    
    return toRet;
}

export { getUserData };