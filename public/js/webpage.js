'use strict';

const url = 'http://localhost:3000/';

let response = await fetch(url + 'login/info', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
}).catch((error) => {
    showError('Error con el servidor, intenta mas tarde.');
    return;
});

response = await response.json();
console.log(response)
if (!response.username)
{
    window.location.href = url;
}


const welcomeText = document.getElementById('welcome');

welcomeText.innerHTML = `Welcome ${response.username}!`;
