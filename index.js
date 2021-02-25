const pTrends = document.querySelector(".trends");
const h2SearchedTerm = document.querySelector(".searched-term");
const imgTrends = document.querySelectorAll(".trending-gif");
const input = document.querySelector(".input-search");
const ulAutocomplete = document.querySelector(".ul-autocomplete");
const spanAutocompleteDivisor = document.querySelector(".autocomplete-divisor");
const searchButton = document.querySelector(".search-button");
const gifsResultContainer = document.querySelector(".gifs-result-container");

let url = "https://api.giphy.com/v1";
let api_key = "tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH";

let urlTrendingTerms = `${url}/trending/searches?api_key=${api_key}`;
let urlTrendingGifs = `${url}/gifs/trending?api_key=${api_key}&limit=3`;
let urlAutocomplete = "";
let urlSearch = "";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

async function fetchTrendingTerms() {
    
    const promiseTrendingTerms = await fetch(urlTrendingTerms);
    const jsonTrendingTerms = await promiseTrendingTerms.json();
    let trends = jsonTrendingTerms.data.slice(0,5);

    for (let i = 0; i < trends.length ; i++) {
        trends[i] = trends[i].capitalize();
    }

    return trends.join(', ');
}

async function fetchTrendingGifs() {

    const promiseTrendingGifs = await fetch(urlTrendingGifs);
    const jsonTrendingGifs = await promiseTrendingGifs.json();
    const gifs = jsonTrendingGifs.data;
    let src = [];

    for (const gif of gifs) {
        src.push(gif.images.original.webp);
    }  
    return src;
}

async function fetchAutocomplete(url) {

    const promiseAutocomplete = await fetch(url);
    const jsonAutocomplete = await promiseAutocomplete.json();
    const suggestions = jsonAutocomplete.data;
    let name = [];
    for (const suggestion of suggestions) {
        name.push(suggestion.name)
    }
    return name;
}

async function fetchSearch(input) {
    
    urlSearch = `${url}/gifs/search?api_key=${api_key}&q=${input}&limit=12`;
    
    const promiseSearch = await fetch(urlSearch);
    const jsonSearch = await promiseSearch.json();
    const gifs = jsonSearch.data;
    let src = [];

    for (const gif of gifs) {
        src.push(gif.images.original.webp);
    }  
    return src;
}

(async function () { 
    
    const resultado = await Promise.all( [ fetchTrendingTerms(), fetchTrendingGifs() ] );
    const src = resultado[1];

    pTrends.textContent = resultado[0];
    for (let index = 0; index < src.length; index++) {
                imgTrends[index].src = src[index]; 
    }

})();

input.addEventListener("input", () => {

    let inputValue = input.value;
    urlAutocomplete = `${url}/gifs/search/tags?api_key=${api_key}&q=${inputValue}&limit=4`;
    
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
            li.textContent = result[index];
            ulAutocomplete.appendChild(li);
        }
    }
    );
});

searchButton.addEventListener("click", () => {

    //Removes autocomplete element and divisor, clears gifs container

    removeAllChildNodes(ulAutocomplete);
    removeAllChildNodes(gifsResultContainer);
    spanAutocompleteDivisor.classList.remove("d-inline-block");

    let inputValue = input.value;
    h2SearchedTerm.textContent = inputValue.capitalize();

    fetchSearch(inputValue).then( result => {

        for (const src of result) {

            let img = document.createElement("img");
            img.src = src;
            gifsResultContainer.appendChild(img)
        }
    });
});


// searchButton.classList.add("search-button-close");