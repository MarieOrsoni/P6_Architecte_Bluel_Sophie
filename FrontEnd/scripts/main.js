
// Select main
const main = document.querySelector('main');

// Initialise portfolio section
    const portfolioSection = document.createElement('section');
    portfolioSection.id = 'portfolio';

//Insert portfolio before contact form - this does not work!
//const formulaire = document.getElementById('contact');
//main.insertBefore(portfolioSection, formulaire);

// Initialise gallery 
    const galleryProjects = document.createElement('div');
    galleryProjects.className = "gallery";


//Display gallery of projects in DOM
function displayGallery(works) {

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
        }
    } 

//append galleryProjects to portfolioSection
    portfolioSection.appendChild(galleryProjects);
    main.appendChild(portfolioSection);
}

 //Reset gallery for filters
function resetGallery() {
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    displayGallery(works);
    }

// Portfolio with filters 
export function generatePortfolio(works) {
    const mesProjets = document.createElement('h2');
    mesProjets.innerText = 'Mes projets';
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
   
   try {
    const response = await fetch("http://localhost:5678/api/works");
   const works = await response.json();
   
    const categories = [...new Set(works.map((works) => works.category.name))];
    generatePortfolio(works);
   } catch (error) { 
    console.log('Une erreur s\'est produite lors de la récupération des données de l\'API', error);
}