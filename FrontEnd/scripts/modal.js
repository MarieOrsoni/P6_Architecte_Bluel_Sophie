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

         
             //Event listener to open second modal
             addImagesBtn.addEventListener("click", generateModal2);

        }
       
        //Create modal 2

    function generateModal2() {        
        const modalContent = document.getElementById("modal-content");
        const addBtn = document.querySelector(".submitBtnModal");
        addBtn.style.display = 'none';
        modalContent.innerHTML = "";
        const arrowLeft = document.createElement('i');
        arrowLeft.className = "fa-solid fa-arrow-left";
        arrowLeft.id = 'arrowLeft';
        const positionIcons = document.getElementById("positionIcons");
        positionIcons.appendChild(arrowLeft);

        
        const title = document.createElement('h2');
        title.innerHTML = "Ajout photo";
        
          // Create form element
        const form = document.createElement("form");
        form.className = "modalForm-img";
        form.action = "http://localhost:5678/api/works";
        form.method = "post";
        form.id = "form";
         form.innerHTML = `
        <div class="modal-files">
        <i class="fa-regular fa-image"></i>
        <label for="image" id="add-file">+ Ajouter photo</label>
        <input type="file" name="image" id="image" class="hidden">
        <p>jpg, png : 4mo max</p>
        </div>
        <label for="title">Titre</label>
        <input type="text" name="title" id="title" required>
        <p id="too-short"></p>
        <label for="category" id="category">Catégorie</label>
        <select name="category" id="category-select" required>
        <select/>
        <p id="error-message"></p>
        <div class="modal-btn">
        <button type="submit">Valider</button>
        </div>`

    modalContent.appendChild(title);
    modalContent.appendChild(form);

    async function goBack() {
        modal.remove();
        backdrop.remove();
        // Retrieve data from the backend
        const apiWorks = await fetch("http://localhost:5678/api/works");
        const works = await apiWorks.json();
              generateModal(works);
        

      }

      
    arrowLeft.addEventListener("click", goBack);


    }
    /*    
        //Call elements for the second modal
        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        const modal2test = document.createElement("section");
        modal2test.id = "modal2test";
        modal2test.style.display = "block";
       const modal = document.getElementById("modal");
       modal.id = "modal";
        const modal2 = document.createElement("div");
        modal2.id = "modal2";
      
       // const positionIcons = document.createElement("div");
       const positionIcons = document.getElementById("positionIcons");
        
        
        //Close button
       const closeBtn = document.getElementById("i");
       closeBtn.className = "fa-solid fa-xmark";
        closeBtn.addEventListener("click", () => {
            backdrop.remove();
            modal2.remove();
            console.log("button close");
        });
               
        //Arrow left
        const arrowLeft = document.createElement("a");
        arrowLeft.className = "fa-solid fa-arrow-left";

      positionIcons.appendChild(closeBtn);
      positionIcons.appendChild(arrowLeft);
        
        modal2.appendChild(positionIcons);

         //Event listenter
         arrowLeft.addEventListener("click", () => {
            goBack();
        });

         //Function Arrow left - back button 
        async function goBack() {
        const apiWorks = await fetch("http://localhost:5678/api/works");
        const works = await apiWorks.json();
      
        closeModal();
        generateModal(works);
      }
               
        //Title
        const headerTitle = document.createElement("h2");
        headerTitle.innerText = "Ajout photo";
        modal2.appendChild(headerTitle);
               
        
      
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
        modal2.appendChild(form);
       modal2test.appendChild(modal2);    
       modal.appendChild(modal2test);

       //const body = document.querySelector('body');
      // body.insertAdjacentElement('afterbegin', modal);
      // body.insertAdjacentElement('afterbegin', modalContent);
      
*/
    
   // generateModal2();

