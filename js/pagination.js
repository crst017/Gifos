const itemsPagination = document.querySelectorAll(".pagination li");
const paginationPrev = document.querySelector(".pagination span");
const paginationNext = document.querySelector(".pagination span:last-child");

for (const item of itemsPagination) {  
    item.addEventListener("click", (e) => {
        offset = pagination(item.textContent);
        search(e); // Search clicking on pagination
    });
}

paginationPrev.addEventListener ("click" , (e) => { 
    
    let pageNumber = 0;
    for (const item of itemsPagination) {   
        if (item.classList != 0)  pageNumber = item.textContent; // assigns the page number selected
    }
    if (pageNumber != 1) offset = pagination(pageNumber - 1); // 
    search(e);
});

paginationNext.addEventListener ("click" , (e) => {
    let pageNumber = 0;
    for (const item of itemsPagination) {   
        if (item.classList != 0)  {
            pageNumber = item.textContent;
        }
    }
    if (pageNumber != pages) offset = pagination(Number(pageNumber) + Number(1));
    search(e);
});

function pagination(pageNumber) {

    pageNumber = parseInt(pageNumber);
    let offset = 0;

    switch (pageNumber){
        case 1:
            setNumeration( 1 );
            itemsPagination[0].classList.add("li-selected");
            break;
        case 2:
            setNumeration( 1 );
            itemsPagination[1].classList.add("li-selected");
            break;
        case pages-1 :
            setNumeration( pages - 4);
            itemsPagination[3].classList.add("li-selected");
            break;
        case pages:
            setNumeration( pages - 4);
            itemsPagination[4].classList.add("li-selected");
            break;
        default:
            setNumeration( pageNumber - 2);
            itemsPagination[2].classList.add("li-selected");
            // removeSelected();
            break;
    }
    offset = (pageNumber - 1) * 12;
    return offset
}        

// Assigns the numbers for the correct numeration
function setNumeration( firstNumber ){
    for (let index = 0; index < itemsPagination.length; index++){
        itemsPagination[index].classList.remove("li-selected"); // Clear background color "selection"
        itemsPagination[index].textContent = index + firstNumber ;
    }
}
