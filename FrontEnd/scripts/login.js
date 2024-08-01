//Constantes
const Login_URL = "http://localhost:5678/api/users/login";
const main = document.querySelector("main");
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

//Initialise form section - contact css styles
const contactSection = document.createElement('section');
contactSection.id = 'contact';
const form = document.createElement('form');

//AppendChild contact section in main
main.appendChild(contactSection);

//Create html page title
//Initialise page title - log in
const pageTitle = document.createElement('h2');
pageTitle.innerText = 'Log In';
contactSection.appendChild(pageTitle);

//Create log in form - html
form.action = "http://localhost:5678/api/users/login";
form.method = "post";
form.id = "form";
form.innerHTML = ` 
<label for = "email">E-mail</label>
                <input type = "email" id="email" required>
                <label for ="password">Mot de passe</label>
                <input type ="password" id="password" name="password">
                <input id="submit" type="submit" value="Se connecter">
                <a href="" class="forgottenPassword">Mot de passe oublié</a>`
//AppendChild form in contact section
contactSection.appendChild(form);

//Event listener for form submission
form.addEventListener('submit', handleLogin);

//Connection management
    async function handleLogin(event) {
    event.preventDefault();

    const loginData = { 
    email: emailInput.value,
    password: passwordInput.value
    };

//Verifie data against data in API - backend

    try {
        const response = await login(loginData); 
        if (response.ok) {
            hideError();
            const data = await response.json();
            window.localStorage.setItem("token", data.token);
            window.location.replace("index.html");
        } else {
            const errorMessage = await handleErrors(response);
            showError(errorMessage);
            }
        } catch (error) {
            console.log(error);
            showError('Erreur inconnue');
    }
}

//Connection
async function logi(loginData) {
    return fetch(Login_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
}

//Handle errors
async function handleErrors(response) {
        let errorMessage;
        switch (response.status) {
            case 401:
            case 404:
                errorMessage = "Erreur dans l'identifiant ou le mot de passe";
                break;
            default:
                errorMessage = "Erreur inconnue";
        }
        return errorMessage;
    }   

    //Display error message 
    function showError(errorMessage) {
        const error = document.getElementById('loginError'); 
        error.innerText = errorMessage;
        error.style.visibility = "visible";
    }

    //Function to hide errors
    function hideError() {
        const error = document.getElementById('loginError');
        error.style.visibility = "hidden";
    }