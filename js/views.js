const favorites = document.querySelector(".favorites");
const searchBlock = document.querySelector(".search-block");
const results = document.querySelector(".results");
const resultsDivisor = document.querySelector('.results-divisor');
const checkBox = document.querySelector('.checkbox');

let view;
// let gifsPages = [];
const ul = document.querySelector('.menu ul');
ul.addEventListener( "click" , (e) => { displayFavorites(e) });

const logo = document.querySelector('.logo');
logo.addEventListener( "click" , (e) => { displayFavorites(e) });

function displayFavorites (e) {

    checkBox.checked = false; //Close menu automatically
    view = e.target.textContent || "GIFOS";
    h2SearchedTerm.textContent = view;
    // paginationContainer.id = 'pagination-hide'; //Dont use pagination
    resetSearch();

    switch (view) {
        case "Favoritos":
            removeAllChildNodes(gifsResultContainer);
            searchFavorites();
            displayGifs( view , "fav-gif-icon" , "my-gif-icon" ); 
            break;
        case "Mis GIFOS":
            removeAllChildNodes(gifsResultContainer);
            displayGifs( view , "my-gif-icon" , "fav-gif-icon" );
            break;
        case "GIFOS":
            goHome();
            break;
        default: // Click on night or day mode
            goHome();
            changeMode();
            break;
    }
}

// selected "view", class to add, class to remove. Each class changes the icon to display according to the selected view
function displayGifs( view , addClass , removeClass ) {

    const span = document.querySelector('.section-image');
    h2SearchedTerm.textContent = view;
    searchBlock.id = "search-block-hide";
    results.classList.add('d-inline-block');
    span.classList.remove(`${removeClass}`);
    span.classList.add(`${addClass}`);
}



function searchFavorites() {

    let localStorageGifs = [];

    for (let index = 0; index < localStorage.length; index++) {

        const key = localStorage.key(index);
        let gif = localStorage.getItem(key);
        
        try { gif = JSON.parse(gif) } 
        catch (error) { gif = null }
        
        if (gif.src) localStorageGifs.push(gif); // LocalStorageGifs stores all the gifs in the LocalStorage
    }
   
    if ( localStorageGifs.length == 0) {
        displayFavEmpty()
    } else {

        pages = Math.ceil( localStorageGifs.length / 12); // Sets the global variable pages for pagination
        gifsPages = createGifsPages( localStorageGifs , 1); // Creates an array, each position is a 12 Gifs page
        pagination(1);
        createGifsElement( gifsPages , 1 );
    }  
}

function displayFavEmpty() {

    gifsResultContainer.classList.add('empty');
    const span = document.createElement('span');
    span.removeAttribute('class'); //Clears any class in order to display the correct image
    span.classList.add('empty-favs');
    gifsResultContainer.appendChild(span);

    h2 = document.createElement('h2');
    h2.textContent = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
    gifsResultContainer.appendChild(h2);
}

function goHome() {
    searchBlock.removeAttribute('id');
    results.classList.remove('d-inline-block');
    const span = document.querySelector('.results .section-image');
    span.removeAttribute('class');
    span.classList.add('section-image');
}

function createGifsElement ( gifPage , actualPage ) {
    removeAllChildNodes(gifsResultContainer);
    for (const gif of gifPage[actualPage - 1]) { //page number is a global variable that indicates the current page
        let img = document.createElement("img");
        img.src = gif.src;
        img.gif = gif; // Adding the Gif object as a property to the HTML tag
        gifsResultContainer.appendChild(img);
        favListener(img); // Adding event to display full screen gif if the image is clicked
    }
}

function replaceGifs ( gifPage , actualPage ) {

    let page = gifPage[actualPage - 1];
    let resultImages = document.querySelectorAll(".gifs-result-container img");

    for (let index = 0; index < 12; index++) {

        if (page[index]) {
            resultImages[index].src = page[index].src;
            resultImages[index].gif = page[index];
        } else {
            try { resultImages[index].remove() } 
            catch { break }
        }
    }
}

function createGifsPages( localStorageGifs ) {

    let gifPagesArray = [];
    for (let index = 0; index < pages; index++) {

        let inicio = ( index * 12 );
        let fin = ( inicio + 12);
        let gifPage = localStorageGifs.slice( inicio , fin );

        gifPagesArray.push(gifPage); // Creates an array, each position is a 12 Gifs page
    }
    return gifPagesArray;
}
