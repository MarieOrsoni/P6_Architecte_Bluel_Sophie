//Calling form
const form = document.querySelector('form');
form.addEventListener("submit", (event) => {
    event.preventDefault();
//Verification
const emailField = document.getElementById('email');
const validEmail = emailField.value;
if (validEmail === "") {
    console.log('email ok');
} else {
    console.log('error');
}


});

//inside the above function recover data
//Verifie data against the data in backend
//if valid redirect to the admin side of project or error message



