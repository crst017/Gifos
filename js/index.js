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

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

(async function () { 
    
    const resultado = await Promise.all( [ fetchTrendingTerms(), fetchTrendingGifs() ] );
    const trend = resultado[0];
    const src = resultado[1];

    for (let index = 0; index < trend.length; index++) { 
        spanTrends[index].textContent = trend[index]; 
    }
    for (let index = 0; index < src.length; index++) {
        imgTrends[index].src = src[index]; 
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
    urlAutocomplete = `${url}/gifs/search/tags?api_key=${api_key}&q=${inputValue}&limit=4`;
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

function search(e) {
    
    let pages = 0;
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
                graphResults(result[0]);
                pages = result[1];
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
                replaceResults(result[0]);
                pages = result[1];
            });
            break;
        default:
            resetSearch();
            break;
    }
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

    for (const src of result) {
        let img = document.createElement("img");
        img.src = src;
        gifsResultContainer.appendChild(img);
        favListener(img)
    }
}

function replaceResults (result) {

    let resultImages = document.querySelectorAll(".gifs-result-container img");     
    
    for (let index = 0; index < result.length; index++) {
        resultImages[index].src = result[index];
    }
}

function favListener(element) {
    element.addEventListener("click", (e) => {displayFav(e)});
}

for (const img of imgTrends) {
    img.addEventListener("click", (e) => {displayFav(e)})
}

function displayFav (event) {
    let selected = document.querySelector(".selected");
    let scroll = window.scrollY;
    selected.style.top = `${scroll}px` 
    window.scrollTo(0,scroll)

    let imgSelected = document.querySelector(".selected img")
    imgSelected.src = event.target.src;
    
    selected.classList.add("display-selected"); 
    document.body.classList.add("display-selected"); 
}