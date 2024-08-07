//Modal window
const main = document.querySelector('main');

const modal1 = document.createElement('div');
modal1.id = 'page1';
const pageHeader = document.createElement("h2");
pageHeader.innerText = "Galerie photo";
const closeButton = document.createElement('h3');
closeButton.className = 'closeButton';
closeButton.innerText = "X";

//Create form to upload gallery and add photos


//Open modal
function openModal(e) {
    e.preventDefault();

const target = document.querySelector('.openWindow');
target.removeAttribute('aria-hidden');
target.setAttribute('aria-modal', 'true');

modal1.appendChild(pageHeader);
main.appendChild(modal1);
}
//Close modal
function closeModal() {
    const target = document.querySelector('.openWindow');
    target.setAttribute('aria-hidden', 'true');
    target.removeAttribute('aria-modal');

    //Remove modal content from screen
    modal1.removeChild(pageHeader);
    main.removeChild(modal1);
}
//Event listener to close modal
document.querySelector('.closeButton').addEventListener('click', closeModal);

//Event listener to open modal
document.querySelector('.openWindow').addEventListener("click", openModal);

//Link form