const baseUrl = "localhost:3001/api/auth"

// Doesn't work yet
class AuthAccessor{
    addNewUser(email, password) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${baseUrl}?userEmail=${email}&userPass=${password}`);
        return xhr.responseText;
    }
}