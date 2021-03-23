const favorites = document.querySelector(".favorites");
const searchBlock = document.querySelector(".search-block");
const results = document.querySelector(".results");
const resultsDivisor = document.querySelector('.results-divisor');
const checkBox = document.querySelector('.checkbox');

function displayFavorites (e) {

    checkBox.checked = false;
    const view = e.target.textContent;
    h2SearchedTerm.textContent = view;
    console.log(view)
    switch (view) {
        case "Modo Nocturno":
            break;
        case "Favoritos":
            searchFavorites();
            displayGifs( view , "fav-gif-icon" , "my-gif-icon" );
            pagination(1);
            break;
        case "Mis GIFOS":
            displayGifs( view , "my-gif-icon" , "fav-gif-icon" );
            break;
    }
}

const ul = document.querySelector('.menu ul');
ul.addEventListener( "click" , (e) => { displayFavorites(e) })

function displayGifs( view , addClass , removeClass ) {
    
    span = document.querySelector('.results .section-image');
    h2SearchedTerm.textContent = view;
    searchBlock.id = "search-block-hide";
    results.classList.add('d-inline-block');
    span.classList.remove(`${removeClass}`);
    span.classList.add(`${addClass}`);
    resultsDivisor.style.display = "none";
}

function searchFavorites() {

    for (let index = 0; index < localStorage.length; index++) {

        key = localStorage.key(index);
        gif = localStorage.getItem(key);
        gif = JSON.parse(gif);

        let img = document.createElement("img");
        img.src = gif.src;
        img.gif = gif; // Adding the Gif object as a property to the HTML tag
        gifsResultContainer.appendChild(img);
        favListener(img) // Adding event to display full screen gif if the image is clicked 
    
    }

}

