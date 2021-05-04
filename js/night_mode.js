const footer = document.querySelector('footer');
const searchSection = document.querySelector('.search');
const selectedSection = document.querySelector('.selected');
const trendingSection = document.querySelector('.trending');
const resultsSection = document.querySelector('.results');
const gifosLogo = document.querySelector('.logo span');
const searchContainer = document.querySelector('.search-container');
const iconSearch = document.querySelector('.search-button');
const menu = document.querySelector('.menu');
const firstLi = document.querySelector('.menu ul li'); // Just the first 
const favButtonDark = document.querySelector('.selected .options .fav-button');
const newGif = document.querySelector('.new-gif');
const navbar = document.querySelector("nav");
const menuItems = document.querySelector(".menu-items");

let night_mode = localStorage.getItem( "night" );

if ( night_mode ) {
    switch ( night_mode ) {
        case "true":
            applyNight();
            night_mode = true;
            break;
        case "false":
            applyDay();
            night_mode = false;
            break;
    }
} 
else {
    console.log("entre false")
    localStorage.setItem( "night" , false );
    night_mode = false;
}

function changeMode( view ) {

    night_mode = !night_mode;
    // view = view.toLowerCase();
    localStorage.setItem( "night" , night_mode )

    if (night_mode) {
        applyNight();
    }
    else {
        applyDay();
    }
}

checkBox.addEventListener( "click" , () => {
    if ( night_mode ) {
        openBurger(checkBox.checked)
    } 
});

ul.addEventListener( "click" , ()=> {
    if ( night_mode ) {
        checkBox.checked = false;
        openBurger(checkBox.checked)
    } 
}) 

function applyNight() {

    firstLi.textContent = "Modo Diurno";
    navbar.classList.add('night');
    gifosLogo.classList.add('night');
    screen.width > 767 ? menuItems.classList.add('night') : menuItems.classList.remove('night');
    searchSection.classList.add('night');
    trendingSection.classList.add('night');
    selectedSection.classList.add('night');
    resultsSection.classList.add('night');
    footer.classList.add('night');

    newGif.id = 'icon-new-gif'
}

function applyDay() {

    firstLi.textContent = "Modo Nocturno";
    navbar.classList.remove('night');
    gifosLogo.classList.remove('night');
    searchSection.classList.remove('night');
    trendingSection.classList.remove('night');
    selectedSection.classList.remove('night');
    resultsSection.classList.remove('night');
    footer.classList.remove('night');

    newGif.removeAttribute('id');
}

//Changes the icon in night mode clicking on burger menu
function openBurger( status ) {
    status ? burgerLogo.id = 'icon-close' : burgerLogo.id = 'icon-burger'
}