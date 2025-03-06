'use strict';

const url = 'http://localhost:3000/';

let response = await fetch(url + 'webpage/info', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
}).catch((error) => {
    showError('Error con el servidor, intenta mas tarde.');
    return;
});
try{
    response = await response.json();
}
catch(error)
{
    console.log(error);
    window.location.href = url;
}

console.log(response)
if (!response.username)
{
    window.location.href = url;
}


const welcomeText = document.getElementById('welcome');

welcomeText.innerHTML = `Welcome ${response.username}!`;
