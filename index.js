console.log("enlazado");

// tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH

let url = "https://api.giphy.com/v1";
let api_key = "tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH";

let urlTrendingTerms = `${url}/trending/searches?api_key=${api_key}`;
let urlTrendingGifs = `${url}/gifs/trending?api_key=${api_key}&limit=3`

const pTrends = document.querySelector(".trends");
const imgTrends = document.querySelectorAll(".trending-gif");

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

(async function () { 

    const resultado = await Promise.all( [ fetchTrendingTerms(), fetchTrendingGifs() ] );
    const src = resultado[1];

    pTrends.textContent = resultado[0];
    for (let index = 0; index < src.length; index++) {
                imgTrends[index].src = src[index]; 
    }

})();

