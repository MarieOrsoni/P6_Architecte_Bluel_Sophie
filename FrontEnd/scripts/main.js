//Generate modal from editing mode page
import { generateModal } from "../scripts/modal.js";

// Select main
const main = document.querySelector("main");

// Initialise portfolio section
//const portfolioSection = document.getElementById("portfolio");
const portfolioSection = document.createElement("section");
portfolioSection.id = "portfolio";

// Initialise gallery
//const galleryProjects = document.getElementById("gallery");
const galleryProjects = document.createElement("div");
galleryProjects.className = "gallery";

//Display gallery of projects in DOM
export function displayGallery(works) {
  const contactSection = document.getElementById("contact");

  galleryProjects.innerHTML = "";

  if (Array.isArray(works) && works.length > 0) {
    for (let i = 0; i < works.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figCaption = document.createElement("figcaption");
      img.src = works[i].imageUrl;
      figCaption.textContent = works[i].title;
      //update with modale activity
      figure.id = `works-${works[i].id}`;
      //appendChild to portfolioSection
      figure.appendChild(img);
      figure.appendChild(figCaption);
      galleryProjects.appendChild(figure);
      portfolioSection.appendChild(galleryProjects);
    }
  }
  contactSection.insertAdjacentElement("beforebegin", portfolioSection);
}

// Function to create filter button dynamically
function createFilterButtons(categories) {
  //create filter bar (with buttons)
  const filterBar = document.createElement("div");
  filterBar.className = "filterBar";

  //create the 'tous' button
  const allButton = document.createElement("span");
  allButton.textContent = "Tous";
  allButton.classList.add("filterButton");
  filterBar.appendChild(allButton);

  categories.forEach((category) => {
    const span = document.createElement("span");
    span.textContent = category.trim();
    span.classList.add("filterButton");
    filterBar.appendChild(span);
  });

  //Add event listener for "Tous"/ allButton
  allButton.addEventListener("click", () => {
    displayGallery(works);
  });
  return filterBar;
}
//Function to fetch categories from API
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error fetching works:", error);
    return [];
  }
}

// Portfolio with filters
export function generatePortfolio(works) {
  const mesProjets = document.createElement("h2");
  mesProjets.innerText = "Mes projets";
  mesProjets.id = "projets";

  const categories = [...new Set(works.map((work) => work.category.name))];
  console.log("Categories;", categories);
  const filterBar = createFilterButtons(categories);

  //appendChild to galleryProject
  galleryProjects.appendChild(mesProjets);
  galleryProjects.appendChild(filterBar);
  //appendChild to main to portfolioSection
  portfolioSection.appendChild(mesProjets);
  portfolioSection.appendChild(filterBar);

  main.appendChild(portfolioSection);
  if (!galleryProjects || !portfolioSection || !main) {
    console.error("Required elements are missing in the HTML.");
    return;
  }

  //call displayGallery function
  displayGallery(works);

  portfolioSection.insertBefore(mesProjets, galleryProjects);
  portfolioSection.insertBefore(filterBar, galleryProjects);

  //Add event listener to filter buttons
  const filterButtons = filterBar.querySelectorAll(".filterButton");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterTerm = button.textContent.trim();
      console.log("Filter term:", filterTerm); // Debugging line
      const filteredWorks = works.filter(
        (works) => works.category.name === filterTerm
      );
      console.log("Filtered works:", filteredWorks); // Debugging line
      displayGallery(filteredWorks);
    });
  });
  displayGallery(works);
}

//Function to return table from Works in backend via API
async function initialiseGallery() {
  const works = await fetchWorks();
  generatePortfolio(works);
}
//generatePortfolio(works);
initialiseGallery();

//Login - user view
let userLoginInfos = window.localStorage.getItem("userData");
console.log(userLoginInfos);

if (userLoginInfos) {
  //Create edit page
  //const topHeaderEdit = document.querySelector("header");
  const editPage = document.createElement("div");
  editPage.className = "mode";
  editPage.innerHTML = `
      <i class="fa-regular fa-pen-to-square"></i>   
      <p>Mode édition</p>`;
  const body = document.querySelector("body");
  body.insertAdjacentElement("afterbegin", editPage);

  //Log out button/li
  const logout = document.createElement("li");
  logout.innerText = "logout";
  logout.className = "logout";

  const ul = document.querySelector("nav ul");
  const listItems = ul.getElementsByTagName("li");
  console.log(listItems);
  const lastItem = listItems[listItems.length - 1];
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
  modifyButton.addEventListener("click", async () => {
    const apiWorks = await fetch("http://localhost:5678/api/works");
    const works = await apiWorks.json();

    generateModal(works);
  });

  //Hide filterBar
  const filterBar = document.querySelector(".filterBar");
  filterBar.style.display = "none";
}
