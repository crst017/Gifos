const favorites = document.querySelector(".favorites");
const searchBlock = document.querySelector(".search-block");
const results = document.querySelector(".results");
const resultsDivisor = document.querySelector('.results-divisor');
const checkBox = document.querySelector('.checkbox');

let view ;
function displayFavorites (e) {

    checkBox.checked = false;
    view = e.target.textContent || "GIFOS";
    h2SearchedTerm.textContent = view;
    switch (view) {
        case "Modo Nocturno":
            break;
        case "Favoritos":
            removeAllChildNodes(gifsResultContainer);
            searchFavorites();
            displayGifs( view , "fav-gif-icon" , "my-gif-icon" ); 
            offset = 1;
            pagination(1);
            break;
        case "Mis GIFOS":
            removeAllChildNodes(gifsResultContainer);
            displayGifs( view , "my-gif-icon" , "fav-gif-icon" );
            pagination(1);
            break;
        case "GIFOS":
            searchBlock.removeAttribute('id');
            results.classList.remove('d-inline-block');
            const img = document.querySelector('.section-image').remove();
            // console.log(img)
            break;
    }
}

const ul = document.querySelector('.menu ul');
ul.addEventListener( "click" , (e) => { displayFavorites(e) });

const logo = document.querySelector('.logo');
logo.addEventListener( "click" , (e) => { displayFavorites(e) });

// selected "view", class to add, class to remove
function displayGifs( view , addClass , removeClass ) {

    span = document.querySelector('.results .section-image');
    h2SearchedTerm.textContent = view;
    searchBlock.id = "search-block-hide";
    results.classList.add('d-inline-block');
    span.classList.remove(`${removeClass}`);
    span.classList.add(`${addClass}`);
    spanAutocompleteDivisor.classList.remove("d-inline-block");
}

function searchFavorites() {

    let gifsCount = 0;
    for (let index = 0; index < localStorage.length; index++) {

        key = localStorage.key(index);
        gif = localStorage.getItem(key);
        gif = JSON.parse(gif);

        if (gif.src){

            let img = document.createElement("img");
            img.src = gif.src;
            img.gif = gif; // Adding the Gif object as a property to the HTML tag
            gifsResultContainer.appendChild(img);
            favListener(img); // Adding event to display full screen gif if the image is clicked
            gifsCount++;
        }
    }

    if ( gifsCount == 0) { displayEmpty() }
}

function displayEmpty() {
    const gifsResultContainer = document.querySelector('.gifs-result-container');
    // gifsResultContainer.style.display = "none";
}
