
function addMouseOver ( element ) {
    
    let parent = element.parentNode;
    let content = document.querySelector('.selected .options').cloneNode(true);
    parent.appendChild(content);

    let buttonsContainer = element.nextSibling.childNodes[3];
    let span = document.createElement('span');
    span.classList.add('fullview-button');
    buttonsContainer.appendChild(span);

    let username = element.nextSibling.children[0].children[0];
    let title = element.nextSibling.children[0].children[1];

    // Reeplaces the Object GIF data into the card
    title.textContent = element.gif.title;
    username.textContent = element.gif.username;

    configureButtons( element );
}

function replaceMouseOver( element ) {

    let username = element.nextSibling.children[0].children[0];
    let title = element.nextSibling.children[0].children[1];

    // Reeplaces the Object GIF data into the card
    title.textContent = element.gif.title;
    username.textContent = element.gif.username;

    let gifID = element.gif.id;
    let favButton = element.nextSibling.children[1].children[0];
    statusGif = gifInLocalStorage( gifID , favButton );  
}

function configureButtons( element ) {

    let gifID = element.gif.id;
    let favButton = element.nextSibling.children[1].children[0];
    let downloadButton = element.nextSibling.children[1].children[1];

    statusGif = gifInLocalStorage( gifID , favButton );
    // Change Gif status property and set or remove GIF object from local storage
    favButton.addEventListener("click" , (e) => changeGifStatus ( favButton , e )); 
}

let urlBlobDesktop = "";
function configureDownloadDesktop() {
    const cardsContainer = document.querySelectorAll('.card-container');
    for (const card of cardsContainer) {
        card.addEventListener( "mouseenter" , configureDownloadOnHover );
        card.addEventListener( "mouseleave" , () => URL.revokeObjectURL(urlBlobDesktop) );
    }
}

async function configureDownloadOnHover( event ) {

    gifObject = event.target.children[0].gif
    const downloadButton = event.target.children[1].children[1].children[1];
    const gifFetch = await fetch( gifObject.downloadSrc );
    const file = await gifFetch.blob();

    downloadButton.download = `${gifObject.title}_${gifObject.id}`;
    urlBlobDesktop = URL.createObjectURL( file );

    downloadButton.href = urlBlobDesktop;
}



