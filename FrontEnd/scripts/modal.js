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
            

           //Footer - Button to add images - ajouter une photo
           const modalFooter = document.createElement('div');
           modalFooter.id = "footer";
           const addImagesBtn = document.createElement('p');
           addImagesBtn.className = "submitBtnModal";
           addImagesBtn.innerHTML = "Ajouter une photo";

           modalFooter.appendChild(addImagesBtn);
           modalContent.appendChild(modalFooter);
        
            
            //Create const to close modal 
            const closeModal = function() {
            backdrop.remove();
            modal.remove();
            
            console.log("button clicked");
             };
             closeBtn.addEventListener("click", closeModal);


         
         //Event to go to generateModal2
         addImagesBtn.addEventListener("click", async () => {
         modalContent.style.display = "none";
          generateModal2(works);
         console.log("button clicked");
      });
    
    
        //Create modal 2

    function generateModal2(works) {        
        
        //Call elements for the second modal
        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        const modal2test = document.createElement("section");
        modal2test.id = "modal2test";
        const modal2 = document.createElement("div");
        modal2.id = "modal2";
       // modal2.style.display = "block";
        const positionIcon2 = document.createElement("div");
        positionIcon2.className = "positionIcons";    
        
        //Close button
       const closeBtn = document.createElement("i");
       closeBtn.className = "fa-solid fa-xmark";
        closeBtn.addEventListener("click", () => {
            backdrop.remove();
            modal2.remove();
            console.log("button close");
        });
               
        //Arrow left
        const arrowLeft = document.createElement("a");
        arrowLeft.className = "fa-solid fa-arrow-left";

      //  positionIcon2.appendChild(closeBtn);
        positionIcon2.appendChild(arrowLeft);
        
        modal2.appendChild(positionIcon2);
       
        //Title
        const headerTitle = document.createElement("h2");
        title.innerText = "Ajout photo";
        modal2.appendChild(title);
               
        
      
        //form to upload photos
        const form = document.createElement("form");
        form.action = "http://localhost:5678/api/works";
        form.method = "post";
        form.id = "formPhoto";
        form.innerHTML = `
        <div class = "modal-files">
        <span class="fa-regular fa-image"></span>
        <label for="image" id = "uploadPhoto">+ Ajouter photo</label>
        <input type="file" id="image" name="image" class = "hidden" required>
        <p>jpg, png : 4mo max</p>
        </div>
        <label for="title">Titre</label>
        <input type="text" id="title" name="title" required>
        <p id="too-short"></p>
        
        <select id="category-select" name="name" required>
        <option value="category>name</option>
        <label for="category" id="category">Catégorie</label>
        <p id="error-message"></p>
        </select>

        <div class="btn-submit">
        <button type="submit">Valider</button>
        </div>
        </form>
        `
        modal2test.appendChild(form);

      
       modal.appendChild(modal2test);
      

    }
    generateModal2(works);
}
