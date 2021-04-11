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

    nav.id = 'dark';
    footer.id = 'dark';
    searchSection.id = 'dark';
    selectedSection.id = 'dark'; 
    inputSearch.id = 'dark';
    gifosLogo.id = 'dark';
    for (const p of pArray) p.id = 'dark';

    menu.id = 'dark-black';
    pTrending.id = 'dark-trending';
    trendingSection.id = 'dark-trending';
    searchContainer.id = 'border-white';

    iconSearch.id = 'icon-search';
    burgerLogo.id = 'icon-burger';
    closeSelected.id = 'icon-close';
}

function applyDay() {

    nav.removeAttribute('id');
    footer.removeAttribute('id');
    searchSection.removeAttribute('id');
    selectedSection.removeAttribute('id');
    inputSearch.removeAttribute('id');
    gifosLogo.removeAttribute('id');
    for (const p of pArray) p.removeAttribute('id');

    menu.removeAttribute('id');
    pTrending.removeAttribute('id');
    trendingSection.removeAttribute('id');
    searchContainer.removeAttribute('id');

    iconSearch.removeAttribute('id');
    burgerLogo.removeAttribute('id');
    closeSelected.removeAttribute('id');
    
}

//Changes the icon in night mode clicking on burger menu
function openBurger( status ) {
    status ? burgerLogo.id = 'icon-close' : burgerLogo.id = 'icon-burger'
}