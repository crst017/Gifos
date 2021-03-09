let url = "https://api.giphy.com/v1";
let api_key = "tuLKngOFWAfJbQBfXEDFpS0Qnr9ndXcH";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

class Gif {  
    constructor( title, username, src) {
      this.title = title;
      this.username = username;
      this.src = src;
      this.status = false;
    }
}

async function fetchTrendingTerms() {

    const urlTrendingTerms = `${url}/trending/searches?api_key=${api_key}`;
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

async function fetchTrendingGifs() {

    const urlTrendingGifs = `${url}/gifs/trending?api_key=${api_key}&limit=3`;
    return gifArray( urlTrendingGifs );
}

async function fetchSearch(input,offset) {

    let urlSearch = `${url}/gifs/search?api_key=${api_key}&q=${input}&limit=12&offset=${offset}`;
    return gifArray( urlSearch ) 
}

async function gifArray ( url ) {

    const promise = await fetch( url );
    const json = await promise.json();
    const gifs = json.data;
    let gifArray = [];
    let pages = Math.ceil(json.pagination.total_count/12);
    
    for (const gif of gifs) {
        
        let title = gif.title ? gif.title.capitalize().split(" GIF",1)[0] : input;
        let username = gif.user && gif.user.display_name ? gif.user.display_name :
                                            gif.username ? gif.username          : "No Username";
        let newGif = new Gif ( title , username , gif.images.original.webp , )
        gifArray.push(newGif);
    }

    return { "gifArray" : gifArray , "pages" : pages}  
}
