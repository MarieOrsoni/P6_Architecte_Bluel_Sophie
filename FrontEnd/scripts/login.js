

const main = document.querySelector("main");
//Create login page form
function generateConnection() { 
  
//Initialise form section - contact css styles
const contactSection = document.createElement('section');
contactSection.id = 'contact';
const pageTitle = document.createElement('h2');
pageTitle.innerText = 'Log In';

//Create log in form - html
const form = document.createElement("form");
form.action = "http://localhost:5678/api/users/login";
form.method = "post";
form.id = "form";
form.innerHTML = ` 
<label for = "email">E-mail</label>
                <input type = "email" id="email" required>
                <p id="wrongEmail"></P>
                <label for ="password">Mot de passe</label>
                <input type ="password" id="password" name="password" required>
                <p id="wrongPassword"></P>
                <input id="submit-connection" type="submit" value="Se connecter">
                <a href="" class="forgottenPassword">Mot de passe oublié</a>
                `;
//AppendChild form in contact section
contactSection.appendChild(pageTitle);
contactSection.appendChild(form);
main.appendChild(contactSection);

//Formatting css of log in form
form.classList.add("login");
}
generateConnection();

//Log in authentification

const Login_URL = "http://localhost:5678/api/users/login";
const form = document.getElementById("form");

//Login function
function loginAuthentification() {
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let formData = JSON.stringify({email: email, password: password})
    console.log(formData);

    const requestInfos = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formData
    };


    
    
    fetch(Login_URL, requestInfos)
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                const emailMessage = document.getElementById("wrongEmail");
                const passwordMessage = document.getElementById("wrongPassword");
                error.email = true;
                error.password = true;
            
                emailMessage.innerText = "E-mail ou mot de passe incorrect";
                emailMessage.style.color = "red";
                emailMessage.style.margin = "4px";
                emailMessage.style.display = "block";
           
                passwordMessage.innerText = "E-mail ou mot de passe incorrect";
                passwordMessage.style.color = "red";
                passwordMessage.style.margin = "4px";
                passwordMessage.style.display = "block";
            } 
            throw new Error('Unauthorized');
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);

        if (data.hasOwnProperty("userId") && data.hasOwnProperty("token")) {
            window.localStorage.setItem("userData", JSON.stringify(data));
            window.location = "./index.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);
       const emailMessage = document.getElementById("wrongEmail");
        const passwordMessage = document.getElementById("wrongPassword");
        emailMessage.innerText = "E-mail ou mot de passe incorrect";
         emailMessage.style.color = "red";
         emailMessage.style.margin = "4px";
         emailMessage.style.display = "block";
 
         passwordMessage.innerText = "E-mail ou mot de passe incorrect";
         passwordMessage.style.color = "red";
         passwordMessage.style.margin = "4px";
         passwordMessage.style.display = "block";
    });
       }
   );       
}
loginAuthentification();
