import { generatePortfolio } from "../scripts/main.js";

//Get token from local storage
let token = window.localStorage.getItem("userData");
if (window.localStorage.getItem("userData")) {
    token = JSON.parse(window.localStorage.getItem("userData")).token;
}

export function generateModal(works) {
    //Create modal
    const backdrop = document.createElement("div");
    backdrop.id = "backdrop";
    //Modal 
    const modal = document.createElement("section");
    modal.id = 'modal';

    const positionIcons = document.createElement("div");
    positionIcons.id = "positionIcons";
    modal.appendChild(positionIcons);

    const closeBtn = document.createElement("i");
    closeBtn.className = "fa-solid fa-xmark";
    positionIcons.appendChild(closeBtn);

    //Modal contents
    const modalContent = document.createElement("div");
    modalContent.id = "modal-content";

    const title = document.createElement("h2");
    title.innerText = "Galerie photo";
    modalContent.appendChild(title);

    const modalImages = document.createElement("div");
    modalImages.className = "modalImages";
    
    for (let i = 0; i < works.length; i++) {
        //Create elements for images in galerie
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.src = works[i].imageUrl;
        //Create the delete icon for images
        const deleteBtn = document.createElement('i');
        deleteBtn.className = "fa-solid fa-trash-can";
        
        figure.appendChild(img);
        figure.appendChild(deleteBtn);
        modalImages.appendChild(figure);
        console.log(works[i]);

        //Delete image event listener
        deleteBtn.addEventListener("click", () => {
            //id
            let id = works[i].id;
            const url = `http://localhost:5678/api/works/${id}`
        //Remove image
        const requestToken = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'accept': "*/*",
                'Authorization': `Bearer ${token}`
            }
                            
        };
            fetch(url, requestToken)
            .then(response => {
                if (response.ok) {
                    figure.remove();
                    document.querySelector(`.gallery #works-${id}`).remove();
                } else {
                    throw new Error('Network response was not ok');
                }
                console.log('Resource deleted successfully');
            })
            .catch(error => {
                console.error("There was a problem with the delete request:", error.message);
            });
            })
            }
            
            modalContent.appendChild(modalImages);
            modal.appendChild(modalContent);

            const body = document.querySelector('body');
            body.insertAdjacentElement("afterbegin", modal);
            body.insertAdjacentElement("afterbegin", backdrop);

            //async function to sendImag?
            
            //Create const for backdrop to close modal
            //error 404 - ca marchait hier donc ca vient de ci-dessous...
            function closeModal1() { 
            const backdrop = document.querySelector('#backdrop');
            const closeBtn = document.querySelector('.closeBtn');
            
           closeBtn.addEventListener("click", (e)=> { 
                e.preventDefault();
            fetch("http://localhost:5678/api/works")
            .then(response => {
                if (response.ok) {
                    backdrop.remove();
                    return response.json();
                    }
            })         
            .then(data => generateModal2(data.works));     
            });

            closeModal1();
            generateModal2(works);
        }
    }

        //Create modal 2

    function generateModal2(works) {
        //create modal
        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        //Modal
        const modal = document.createElement("section");
        modal.id = "modal";
        //Icons
        const positionIcons = document.createElement("div");
        positionIcons.id = "positionIcons";
        modal.appendChild(positionIcons);

        const closeBtn = document.createElement("i");
        closeBtn.className = "fa-solid fa-xmark";
        positionIcons.appendChild(closeBtn);

        const arrowLeft = document.createElement("a");
        arrowLeft.className = "fa-solid fa-arrow-left";
        positionIcons.appendChild(arrowLeft);

        //Modal contents
        const modalContent = document.createElement("div");
        modalContent.id = "modal-content";

        const title = document.createElement("h2");
        title.innerText = "Ajout photo";
        modalContent.appendChild(title);

        //form to upload photos
        //async function pour les options/categories

        //async function for sending images

    }




