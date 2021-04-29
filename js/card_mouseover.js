
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

    configureButtons( element )
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
    console.log(statusGif)
}


function configureButtons( element ) {

    let gifID = element.gif.id;
    let favButton = element.nextSibling.children[1].children[0];
    statusGif = gifInLocalStorage( gifID , favButton );
    // Change Gif status property and set or remove GIF object from local storage
    favButton.addEventListener("click" , (e) => changeGifStatus ( favButton , e )); 
}

async function configureDownloadOnHover( gifObject ) {

    // console.log(gifObject)
    // const downloadButton = document.querySelector(".download-button");
    // const gifFetch = await fetch( gifObject.downloadSrc );
    // const file = await gifFetch.blob();

    // downloadButton.download = `${gifObject.title}_${gifObject.id}`;
    // const urlBlob = URL.createObjectURL( file );

    // downloadButton.href = urlBlob;
}



