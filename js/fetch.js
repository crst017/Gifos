let url = "https://api.giphy.com/v1";
let api_key = "tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH";

let urlTrendingTerms = `${url}/trending/searches?api_key=${api_key}`;
let urlTrendingGifs = `${url}/gifs/trending?api_key=${api_key}&limit=3`;
let urlAutocomplete = "";
let urlSearch = "";

async function fetchTrendingTerms() {
    
    const promiseTrendingTerms = await fetch(urlTrendingTerms);
    const jsonTrendingTerms = await promiseTrendingTerms.json();
    let trends = jsonTrendingTerms.data.slice(0,5);

    for (let i = 0; i < trends.length ; i++) {

        if (i != 4) {
            trends[i] = trends[i].capitalize() + ",";
        }
        else {
            trends[i] = trends[i].capitalize() + " ";
        }
    }
    return trends;
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

async function fetchSearch(input,offset) {

    urlSearch = `${url}/gifs/search?api_key=${api_key}&q=${input}&limit=12&offset=${offset}`;
    const promiseSearch = await fetch(urlSearch);
    const jsonSearch = await promiseSearch.json();
    const gifs = jsonSearch.data;
    let src = [];

    for (const gif of gifs) {
        src.push(gif.images.original.webp);
    }
    pages = Math.ceil(jsonSearch.pagination.total_count/12);
    // console.log(pages,jsonSearch.pagination.total_count);
    return [src, pages];
}