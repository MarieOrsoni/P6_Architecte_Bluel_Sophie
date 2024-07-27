//Calling the log in form
const loginForm = document.querySelector('form');

//add event listener to log in
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

//calling email and password fields
const email = document.getElementById('email').value.trim;
const password = document.getElementById('password').value.trim;

//Values- data entered by user
const logData = {
    email: email,
    password: password,
};
login(logData);
});

//Verifie data against data in API - backend

async function login(logData) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        });

        if (response.ok) {
            let error = document.getElementById("loginError");
            error.style.visibility = "hidden";
            response.json().then((data) => {
                window.localStorage.setItem("token", data.token);
                window.location.replace("index.html");
            });
        } else {
            handleErrors(response);
        }
    } catch (error) {
        console.log(error);
    }
    }

    //Handle errors
    function handleErrors(response) {
        switch (response.status) {
            case 401:
            case 404:
                errorMessage = "Erreur dans l'identifiant ou le mot de passe";
                break;
            default:
                errorMessage = "Erreur inconnue";
        }
    //Display error message 
    let error = document.getElementById('loginError');
    error.innerText = errorMessage;
    error.style.visibility = "visible";
    }