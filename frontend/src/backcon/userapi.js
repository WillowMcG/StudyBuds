const baseUrl = "localhost:3001/api/users"

// Doesn't work yet
class UserAccessor{
    getUserJson(userId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${baseUrl}/${userId}`);
        return xhr.responseText;
    }
}