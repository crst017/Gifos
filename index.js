console.log("enlazado");

// tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH

let url = "https://api.giphy.com/v1";
let api_key = "tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH";

let urlTrendingTerms = `${url}/trending/searches?api_key=${api_key}`;
let urlTrendingGifs = `${url}/gifs/trending?api_key=${api_key}&limit=3`;
let urlAutocomplete = "";

const pTrends = document.querySelector(".trends");
const imgTrends = document.querySelectorAll(".trending-gif");
const input = document.querySelector(".input-search");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
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

(async function () { 

    const resultado = await Promise.all( [ fetchTrendingTerms(), fetchTrendingGifs() ] );
    const src = resultado[1];

    pTrends.textContent = resultado[0];
    for (let index = 0; index < src.length; index++) {
                imgTrends[index].src = src[index]; 
    }

})();

input.addEventListener("input", () => {
    let q = input.value;
    urlAutocomplete = `${url}/gifs/search/tags?api_key=${api_key}&q=${q}&limit=4`;

    fetchAutocomplete(urlAutocomplete).then( result => {
        console.log(result)

        // Crear una lista desordenada y añadirla como hijo del input

        // Calcular la longitud del resultado
        // Dentro de un ciclo crear la cantidad de list items que devuelve el resultado
        // Asignar al list item el valor deseado ( resultado de autocompletar )
        // Colocar en negrilla las letras que coinciden con el valor del input
        // Hacer append del list item al listado UL
    }
    );
});

