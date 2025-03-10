"use strict"

async function hashInput(inputString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


const url = "http://localhost:3000/";

const loginButton = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

loginButton.addEventListener("click", async  (event) => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // console.log(username, password);
  const hashedpassword = await hashInput(password);

  let response = await fetch(url + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: hashedpassword,
    }),
  })
    .catch((error) => {
      showError("Error con el servidor, intenta mas tarde.")
      return;
    });


    response = await response.json();

    if (!response.status)
    {
      showError(response.message)
      return;
    }
    else
    {
      showSucc("Successfully logged in!");
      // console.log(response.jwt);
      // localStorage.setItem('jwt', response.jwt);
      window.location.href = url + response.redirect;
    }
});

function showError(e)
{
  successMessage.style.display = 'none';
  errorMessage.innerHTML = e;
  errorMessage.style.display = 'block'; 
}

function showSucc(e)
{
  errorMessage.style.display = 'none';
  successMessage.innerHTML = e;
  successMessage.style.display = 'block'; 
}
