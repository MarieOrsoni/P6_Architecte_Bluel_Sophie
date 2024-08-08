//Generate modal from editing mode page
import { generateModal} from "../scripts/modal.js";

// Select main
const main = document.querySelector('main');

// Initialise portfolio section
   const portfolioSection = document.createElement('section');
    portfolioSection.id = 'portfolio';

// Initialise gallery 
   const galleryProjects = document.createElement('div');
    galleryProjects.className = "gallery";


//Display gallery of projects in DOM
export function displayGallery(works) {

    galleryProjects.innerHTML = '';

        if (Array.isArray(works) && works.length > 0) { 
        for (let i = 0; i < works.length; i++) { 
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        img.src = works[i].imageUrl;
        figCaption.textContent = works[i].title;

//appendChild to portfolioSection
        figure.appendChild(img);
        figure.appendChild(figCaption);
        galleryProjects.appendChild(figure);
        portfolioSection.appendChild(galleryProjects);
        }
    } 
}

// Portfolio with filters 
export function generatePortfolio(works) {
    const mesProjets = document.createElement('h2');
    mesProjets.innerText = 'Mes projets';
    mesProjets.id = "projets";

//create filter bar (with buttons)
    const filterBar = document.createElement('div');
    filterBar.className = 'filterBar';
    filterBar.innerHTML = `
    <span>Tous</span>
    <span>Objets</span>
    <span>Appartements</span>
    <span>Hotels & restaurants</span> `;

//appendChild to main to portfolioSection
    portfolioSection.appendChild(mesProjets);
    portfolioSection.appendChild(filterBar);
    main.appendChild(portfolioSection);
    //call displayGallery function
    displayGallery(works);
    
 
//create filter (buttons)
    const filterButtons = document.querySelectorAll('.filterBar span');
//add css to filterBar (buttons)
    filterBar.classList.add("filterbar");
//Loop through each buttons and event listener
    filterButtons.forEach(button => {
        button.addEventListener('click', () => { 
            const filterTerm = button.textContent.trim();

            let filteredWorks;

    switch(filterTerm) {
        case "Objets": 
            filteredWorks = works.filter(works => works.category.name === "Objets");
            break;
        case "Appartements": 
            filteredWorks = works.filter(works => works.category.name === "Appartements");
            break;
        case "Hotels & restaurants":
            filteredWorks = works.filter(works => works.category.name === "Hotels & restaurants");
            break;
        default:
            filteredWorks = works;
            break;
    }
   // console.log(filteredWorks);
    displayGallery(filteredWorks);
    });
    });
}

//Function to return table from Works in backend via API
   
    const apiWorks = await fetch("http://localhost:5678/api/works");
    const works = await apiWorks.json();
   
   generatePortfolio(works);
    
   //Export contact form

   export function generateContacForm () {
    const contactSection = document.createElement("section");
    contactSection.id = 'contact';

    const contactHeader = document.createElement("h2");
    contactHeader.innerText = "Contact";

    const para = document.createElement("p");
    para.innerText = "Vous avez un projet ? Discutons-en !";

    //Create form

    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.innerHTML = ` 
			<label for="name">Nom</label>
			<input type="text" name="name" id="name">
			<label for="email">Email</label>
			<input type="email" name="email" id="email">
			<label for="message">Message</label>
			<textarea name="message" id="message" cols="30" rows="10"></textarea>
			<input type="submit" value="Envoyer"> `;

		contactSection.appendChild(contactHeader);
        contactSection.appendChild(para);
        contactSection.appendChild(form);
        main.appendChild(contactSection);

   }
   generateContacForm();

   //Login - user view
   let userLoginInfos = window.localStorage.getItem("userData");
   console.log(userLoginInfos);
   
   if (userLoginInfos) {
    //Create edit page 
      const topHeaderEdit = document.querySelector("header");
      const editPage = document.createElement("div");
      editPage.className = "mode";
      editPage.innerHTML = `
      <i class="fa-regular fa-pen-to-square"></i>   
      <p>Mode édition</p>`;
      const body = document.querySelector("body");
      body.insertAdjacentElement("afterbegin", editPage)

    //Log out button/li
    const logout = document.createElement("li");
    logout.innerText = "logout";
    logout.className = "logout";

    const ul = document.querySelector("nav ul");
    const listItems = ul.getElementsByTagName("li");
    console.log(listItems)
    const lastItem = listItems[listItems.length -1];
    lastItem.insertAdjacentElement("beforebegin", logout);

    logout.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.removeItem("userData");

        location.reload();
    });

    // Hide login button/li
    const loginLi = ul.querySelector("li:nth-child(3)");
    loginLi.style.display = "none";

    //Remove mes projets/header
    const mesProjets = document.getElementById("projets");
    mesProjets.style.display = "none";

    //Create modifier/edit
    const editing = document.createElement("div");
    editing.className = "editing";
    editing.innerHTML = `
    <h2>Mes projets</h2>
    <div class = "modify">
    <i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>
    </div>`;

    const portfolioSection = document.getElementById("portfolio");
    portfolioSection.insertAdjacentElement("afterbegin", editing);

    const modifyButton = document.querySelector(".modify");
    modifyButton.addEventListener("click", async() => {
        const apiWorks = await fetch("http://localhost:5678/api/works");
        const works = await apiWorks.json();

        generateModal(works);
    });
    //Hide filterBar
    const filterBar = document.querySelector(".filterBar");
    filterBar.style.display = "none";
   }

