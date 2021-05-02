const nav = document.querySelector('nav');
const footer = document.querySelector('footer');
const searchSection = document.querySelector('.search');
const selectedSection = document.querySelector('.selected');
const trendingSection = document.querySelector('.trending');
const inputSearch = document.querySelector('.input-search');
const pTrending = document.querySelector('.trending p');
const pArray = document.querySelectorAll('p');
const gifosLogo = document.querySelector('.logo span');
const searchContainer = document.querySelector('.search-container');
const iconSearch = document.querySelector('.search-button');
const burgerLogo = document.querySelector('.burger-logo');
const menu = document.querySelector('.menu ul');
const menuLi = document.querySelectorAll('.menu ul li');
const firstLi = document.querySelector('.menu ul li'); // Just the first 
const favButtonDark = document.querySelector('.selected .options .fav-button');
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
    nav.id = 'dark';
    footer.id = 'dark';
    searchSection.id = 'dark';
    selectedSection.id = 'dark'; 
    inputSearch.id = 'dark';
    gifosLogo.id = 'dark';
    for (const p of pArray) screen.width < 1023 ? p.id = 'dark' : p.removeAttribute('id');
    for (const li of menuLi) if (screen.width > 1023) li.id = "dark";

    screen.width < 1023 ? menu.id = 'dark-black' : menu.id = 'dark';
    pTrending.id = 'dark-trending';
    trendingSection.id = 'dark-trending';
    searchContainer.id = 'border-white';

    iconSearch.id = 'icon-search';
    burgerLogo.id = 'icon-burger';
    closeSelected.id = 'icon-close';

    favButtonDark.id = 'white-bg';
}

function applyDay() {

    firstLi.textContent = "Modo Nocturno";
    nav.removeAttribute('id');
    footer.removeAttribute('id');
    searchSection.removeAttribute('id');
    selectedSection.removeAttribute('id');
    inputSearch.removeAttribute('id');
    gifosLogo.removeAttribute('id');
    for (const p of pArray) p.removeAttribute('id');
    for (const li of menuLi) if (screen.width > 1023) li.removeAttribute('id');
    menu.removeAttribute('id');
    pTrending.removeAttribute('id');
    trendingSection.removeAttribute('id');
    searchContainer.removeAttribute('id');

    iconSearch.removeAttribute('id');
    burgerLogo.removeAttribute('id');
    closeSelected.removeAttribute('id');

    favButtonDark.removeAttribute('id');
    
}

//Changes the icon in night mode clicking on burger menu
function openBurger( status ) {
    status ? burgerLogo.id = 'icon-close' : burgerLogo.id = 'icon-burger'
}