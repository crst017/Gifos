const pTrends = document.querySelector(".trends");
const spanTrends = document.querySelectorAll(".trends span");
const h2SearchedTerm = document.querySelector(".searched-term");
const imgTrends = document.querySelectorAll(".trending-gif");
const input = document.querySelector(".input-search");
const ulAutocomplete = document.querySelector(".ul-autocomplete");
const spanAutocompleteDivisor = document.querySelector(".autocomplete-divisor");
const searchButton = document.querySelector(".search-button");
const gifsResultContainer = document.querySelector(".gifs-result-container");
const sectionResults = document.querySelector(".results");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

(async function () { 
    
    const resultado = await Promise.all( [ fetchTrendingTerms(), fetchTrendingGifs() ] );
    const trend = resultado[0];
    const gifs = resultado[1].gifArray;

    for (let index = 0; index < trend.length; index++) { 
        spanTrends[index].textContent = trend[index]; 
    }

    // Assign the properties of the Gif object to the HTML tag
    for (let index = 0; index < gifs.length; index++) {  
        imgTrends[index].src = gifs[index].src;
        imgTrends[index].gif = gifs[index];
    }

    for (const span of spanTrends) {
        span.addEventListener("click", (e) => {
            let value = span.textContent.slice(0,-1);
            input.value = value;
            search(e); // Search clicking on trends (span Tag)
        }); 
    }
})();


input.addEventListener("input", () => {

    let inputValue = input.value;
    let urlAutocomplete = `${url}/gifs/search/tags?api_key=${api_key}&q=${inputValue}&limit=4`;
    searchButton.classList.remove("search-button-close"); 
    if (night_mode) iconSearch.id = 'icon-search';    

    fetchAutocomplete(urlAutocomplete).then( result => {

        //Adds or removes the span divisor in the input box
        if (inputValue.length > 0 && result.length != 0) {
            spanAutocompleteDivisor.classList.add("d-inline-block");
        }
        else {
            spanAutocompleteDivisor.classList.remove("d-inline-block");
        };
        
        removeAllChildNodes(ulAutocomplete);

        // Creates and appends a list item to the "ul" filled with the autocomplete fetch
        for (let index = 0; index < result.length; index++) {

            let li = document.createElement("li");
            li.classList.add("li-autocomplete");
            li.textContent = result[index];
            ulAutocomplete.appendChild(li);
            li.addEventListener("click", (e) => {
                input.value = result[index];
                search(e); //Search clicking on autocomplete suggestions
            })
        }
    }
    );
});

searchButton.addEventListener("click", (e) => {search(e)}); // Search clicking on search buttton
input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") { 
        search(e);
        input.blur();
    } 
});

let pages = 0;
const paginationContainer = document.querySelector('.pagination');

function search(e) {   
    
    checkBox.checked = false;
    let classesLength = e.target.classList.length;
    let fClass = classesLength == 1 ? e.target.classList[0] : 
                 classesLength == 2 ? e.target.classList[1] : // To avoid searching by clicking on the close icon
                 e.target.tagName;
    h2SearchedTerm.textContent = input.value.capitalize() || view ; // View is the variable setted when you click on the navbar menu
    searchButton.classList.add("search-button-close"); // Change icon to close icon
    if (night_mode) iconSearch.id = 'icon-close';
    paginationContainer.removeAttribute('id');

    switch (fClass) {
        case "trend-suggestion":
        case "search-button":
        case "li-autocomplete":
        case "input-search":
            offset = 0;
            fetchSearch(input.value, offset).then( (result) => {
                let empty = result.empty;
                removeAllChildNodes(gifsResultContainer);
                if ( empty ) {
                    displayHomeEmpty();
                } else {
                    gifsResultContainer.removeAttribute('id');
                    graphResults(result.gifArray);
                    pages = result.pages;
                    pagination(1);
                }
                
            });
            displaySearch();
            break;
        case "LI":
        case "SPAN":
        case "li-selected":
        case "fa-chevron-left":
        case "fa-chevron-right":
            fetchSearch(input.value, offset).then( (result) => {
                replaceResults(result.gifArray);
            });
            break;
        default:
            resetSearch();
            break;
    }
}

function resetSearch () {
    searchButton.classList.remove("search-button-close");
    if (night_mode) iconSearch.id = 'icon-search';
    sectionResults.classList.remove("d-inline-block");
    input.value = ""
}

function displaySearch () {

    removeAllChildNodes(ulAutocomplete); // Remove everything inside the autocomplete container
    removeAllChildNodes(gifsResultContainer); // Remove everything inside the results container
    spanAutocompleteDivisor.classList.remove("d-inline-block"); // Remove autocomplete divisor
    sectionResults.classList.add("d-inline-block"); // Display the results section
    
}

//Assigns the GIF Object to each image
function graphResults (result){
    
    for (const gif of result) {
        let div = document.createElement('div');
        div.classList.add('card-container');
        let img = document.createElement('img');
        img.src = gif.src;
        img.gif = gif; // Adding the Gif object as a property to the HTML tag
        div.appendChild(img);
        gifsResultContainer.appendChild(div);
        if ( screen.width < 1024 ) favListener(img) // Adding event to display full screen gif if the image is clicked
        if ( screen.width > 1023 ) addMouseOver( img ); // Creates the card for desktop card hover ...
    }
}

//Assigns the GIF Object to each image
function replaceResults (result) {
    
    let resultImages = document.querySelectorAll(".gifs-result-container img");
    
    for (let index = 0; index < result.length; index++) {
        resultImages[index].src = result[index].src;
        resultImages[index].gif = result[index];

        if ( screen.width > 1023 ) replaceMouseOver( resultImages[index] ); // Creates the card for desktop card hover ...
    }
}

function displayHomeEmpty() {
    gifsResultContainer.id = 'empty';
    const span = document.createElement('span');
    gifsResultContainer.appendChild(span);

    h2 = document.createElement('h2');
    h2.textContent = "Intenta con otra búsqueda.";
    gifsResultContainer.appendChild(h2);

    paginationContainer.id = 'pagination-hide';
}

