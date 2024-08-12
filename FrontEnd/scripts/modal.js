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
            

           //Button to add images - ajouter une photo
           const modalFooter = document.createElement('div');
           modalFooter.id = "footer";
           const addImagesBtn = document.createElement('p');
           addImagesBtn.className = "submitBtnModal";
           addImagesBtn.innerHTML = "Ajouter une photo";

           modalFooter.appendChild(addImagesBtn);
           modalContent.appendChild(modalFooter);
        
            
            //Create const for backdrop/overlay to close modal 
            const closeModal = function() {
            backdrop.remove();
            modal.remove();
            console.log("button clicked");
             };
             
             closeBtn.addEventListener("click", closeModal);
                      
           
         
         
     //generateModal2(works);
        //Create modal 2

    function generateModal2(works) {
        //create backdrop Overlay
        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        //Modal Section
        const modal2 = document.createElement("section");
        modal2.id = "modal2";
        //Icons
        const positionIcons = document.createElement("div");
        positionIcons.id = "positionIcons";
        modal2.appendChild(positionIcons);

        const closeBtn = document.createElement("i");
        closeBtn.className = "fa-solid fa-xmark";
        positionIcons.appendChild(closeBtn);

        //Arrow left
        const arrowLeft = document.createElement("a");
        arrowLeft.className = "fa-solid fa-arrow-left";
        positionIcons.appendChild(arrowLeft);
        
        modal2.appendChild(positionIcons);

        //Modal contents
        const modalContent2 = document.createElement("div");
        modalContent2.id = "modal-content";

        const title = document.createElement("h2");
        title.innerText = "Ajout photo";
        modalContent2.appendChild(title);

        const uploadImages = document.createElement("div");
        uploadImages.className ="uploadImages";
    //form to upload photos
        const form = document.createElement("form");
        form.action = "#";
        form.method = "post";
        form.innerHTML = `
        <label for="images">+ Ajouter photo</label>
        <input type="file" id="image" name="image" required>
        <label for="title">Titre</label>
        <input type="text" id="title" name="title" required>
        <label for="category">Catégorie</label>
        <select id="name" name="name">
        <option value="category>name</option>
        </select>
        <button type="submit">Valider</button>
        </form>
        `
        //async function to upload to api    
        //category use switch like for portfolio

        
        //async function pour les options/categories

        //async function for sending images

    
    }
    addImagesBtn.addEventListener("click", async () => {
       const modal2 = document.querySelector('.modale2');
       const backdrop= document.querySelector(".backdrop");
        backdrop.classList.add('show');
        modal2.classList.add('show');
        generateModal2(works);
     });
}
