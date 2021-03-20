// Event to display "full screen" gif if any image on the result section is selected
function favListener(element) {
    element.addEventListener("click", (e) => {displayFav(e)});
}

// Adding event to display full screen gif if any image in the trending section is selected
for (const img of imgTrends) {
    img.addEventListener("click", (e) => {displayFav(e)});
}


// Display the favorites section with the selected Gif img, title and username
const selected = document.querySelector(".selected");
const favButton = document.querySelector(".fav-button");

favButton.addEventListener("click" , changeGifStatus ); // Change Gif status property and set or remove GIF object from local storage

let gifSelected;
let statusGif = false;
function displayFav (event) {

    let scroll = window.scrollY;
    selected.style.top = `${scroll}px`; 
    window.scrollTo(0,scroll);
    gifSelected = event.target.gif;
    
    // Assign the GIF Object properties to the HTML tag, text content attribute
    let imgSelected = document.querySelector(".selected img");
    let username = document.querySelector(".username");
    let title = document.querySelector(".title");
    
    imgSelected.src = event.target.src;
    title.textContent = event.target.gif.title;
    username.textContent = event.target.gif.username;
    
    favButton.classList.remove("fav-button-selected");
    let gifID = event.target.gif.id;

    // Looks if the selected gif is in the localStorage, returns a true or a false
    // The statusGif is set to indicate if whenever the fav button is clicked it must be setted or removed into LocalStorage
    statusGif = gifInLocalStorage( gifID );

    selected.classList.add("display-selected"); 
    document.body.classList.add("display-selected"); 

    configureDownload( event.target.gif ); 
    // downloadGif( event.target.gif ); //Adds the event if the download button (anchor) is clicked, that downloads the gif
}

function gifInLocalStorage( gifID ) {

    let statusStorage = false;
    for (let index = 0; index < localStorage.length; index++) {
        
        if ( gifID == localStorage.key(index) ){

            let key = localStorage.key(index);
            let value = localStorage.getItem(key);
            statusStorage = true;
            favButton.classList.add("fav-button-selected");
        }
    }
    return statusStorage;
}

function changeGifStatus () {
    
    statusGif = !statusGif;
    gifSelected.status = statusGif;
    let key = gifSelected.id;

    if (statusGif) {
        let value = JSON.stringify(gifSelected);
        localStorage.setItem( key , value );
        favButton.classList.add("fav-button-selected");
    } else {
        localStorage.removeItem( key );
        favButton.classList.remove("fav-button-selected");
    }
}

let urlBlob = "";
const closeSelected = document.querySelector(".close-selected");
// Closes the favorite window and removes te Blob
closeSelected.addEventListener("click", () => {

    selected.classList.remove("display-selected");
    document.body.classList.remove("display-selected");
    URL.revokeObjectURL(urlBlob); // Removes blob from memory
});

async function configureDownload( gifObject ) {

    const downloadButton = document.querySelector(".download-button");
    const gifFetch = await fetch( gifObject.src );
    const file = await gifFetch.blob();

    downloadButton.download = `${gifObject.title}_${gifObject.id}`;
    const urlBlob = URL.createObjectURL( file );

    downloadButton.href = urlBlob;
}