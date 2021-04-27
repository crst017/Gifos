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

    title.textContent = element.gif.title;
    username.textContent = element.gif.username;
    
    let brother = element.nextSibling
    
    element.addEventListener( "mouseenter" , () => {
        element.nextSibling.id = 'visible'
    })

    element.addEventListener( "mouseleave" , () => {
        element.nextSibling.removeAttribute('id');
    })
}

// function mouseOverVisible() {
//     let cardContainer = document.querySelector('.card-container');
//     cardContainer.id = 'visible';
// }

