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

// replace(/['"]+/g, '')
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
let pages = 0;

function search(e) {   
    
    let classesLength = e.target.classList.length;
    let fClass = classesLength == 1 ? e.target.classList[0] : 
                 classesLength == 2 ? e.target.classList[1] : // To avoid searching by clicking on the close icon
                 e.target.tagName;
    h2SearchedTerm.textContent = input.value.capitalize();
    searchButton.classList.add("search-button-close"); // Change icon to close icon

    switch (fClass) {
        case "trend-suggestion":
        case "search-button":
        case "li-autocomplete":
            offset = 0;
            fetchSearch(input.value, offset).then( (result) => {
                graphResults(result.gifArray);
                pages = result.pages;
            });
            pagination(1);
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
    // console.log(pages)
}

function resetSearch () {
    searchButton.classList.remove("search-button-close");
    sectionResults.classList.remove("d-inline-block");
    input.value = ""
}

function displaySearch () {

    removeAllChildNodes(ulAutocomplete); // Remove everything inside the autocomplete container
    removeAllChildNodes(gifsResultContainer); // Remove everything inside the results container
    spanAutocompleteDivisor.classList.remove("d-inline-block"); // Remove autocomplete divisor
    sectionResults.classList.add("d-inline-block"); // Display the results section
    
}

function graphResults (result){
    
    for (const gif of result) {
        let img = document.createElement("img");
        img.src = gif.src;
        img.gif = gif; // Adding the Gif object as a property to the HTML tag
        gifsResultContainer.appendChild(img);
        favListener(img) // Adding event to display full screen gif if the image is clicked 
    }
}

function replaceResults (result) {

    let resultImages = document.querySelectorAll(".gifs-result-container img");     
    
    for (let index = 0; index < result.length; index++) {
        resultImages[index].src = result[index].src;
        resultImages[index].gif = gif;
    }
}

// Event to display "full screen" gif if any image on the result section is selected
function favListener(element) {
    element.addEventListener("click", (e) => {displayFav(e)});
}

// Adding event to display full screen gif if the image is selected
for (const img of imgTrends) {
    img.addEventListener("click", (e) => {displayFav(e)})
}


// Displays the favorite window
const selected = document.querySelector(".selected");
const favButton = document.querySelector(".fav-button");


function displayFav (event) {

    let scroll = window.scrollY;
    selected.style.top = `${scroll}px`; 
    window.scrollTo(0,scroll);

    // Assign the GIF object properties to the HTML tag object, text content attribute
    let imgSelected = document.querySelector(".selected img");
    let username = document.querySelector(".username");
    let title = document.querySelector(".title");
    
    imgSelected.src = event.target.src;
    title.textContent = event.target.gif.title;
    username.textContent = event.target.gif.username;
    
    // Add the event to save the GIF object in the local storage 
    favButton.classList.remove("fav-button-selected");
    let gifTitle = event.target.gif.title
    let statusStorage = false;

    for (let index = 0; index < localStorage.length; index++) {
        
        if ( gifTitle == localStorage.key(index) ){
            favButton.classList.add("fav-button-selected");
            key = localStorage.key(index);
            value = localStorage.getItem(key);
            statusStorage = JSON.parse(value).status
        }
    }
    let statusGif = statusStorage;
    // let key = event.target.gif.name
    favButton.addEventListener("click" , () => {
        

        statusGif = !statusGif
        event.target.gif.status = statusGif;

        let key = event.target.gif.title;
        let value = JSON.stringify(event.target.gif);

        if (statusGif) {
            localStorage.setItem( key , value );
            favButton.classList.add("fav-button-selected");
        } else {
            localStorage.removeItem( key );
            favButton.classList.remove("fav-button-selected");
        }


    })

    selected.classList.add("display-selected"); 
    document.body.classList.add("display-selected"); 
}

// Closes the favorite window
const closeSelected = document.querySelector(".close-selected");

closeSelected.addEventListener("click", () => {
    // favButton.removeEventListener("click" , favorites )
    selected.classList.remove("display-selected");
    document.body.classList.remove("display-selected");
})


// function favorites ( gifObject ) {

//     console.log("aqui toy")
//     // gifObject.status = !gifObject.status;
//     // console.log(gifObject);
// }