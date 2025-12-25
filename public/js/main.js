window.sr= ScrollReveal();//scroll animation for html element
sr.reveal('.hero-content',{
    duration:2000,
    distance:"50px",
    origin:'left'
});

sr.reveal('.hero-image',{
    duration:2000,
    distance:"50px",
    origin:'top'
});

sr.reveal('nav',{
    duration:2000,
    distance:"50px",
    origin:'bottom'
});

sr.reveal('.section-title',{
    duration:2000,
    distance:"50px",
    origin:"bottom"
});

//Function for sorting the book data according to book title
function sortDataTitle(){
        const container = document.getElementById('collection');
        const cards = Array.from(container.getElementsByClassName('book-card'));

        cards.sort((a,b)=>{//sort the data from cards
            const titleA = a.querySelector('h3').innerText.toLowerCase();
            const titleB = b.querySelector('h3').innerText.toLowerCase();
            return titleA.localeCompare(titleB);// compare the data and sort them accordingly
        });
        //create a virtual container
        const fragment = document.createDocumentFragment();

        //add cards to virtual container(no screen flicker)
        cards.forEach(card=>fragment.appendChild(card));

        //push everything on the screen at once
        container.appendChild(fragment);//won't create duplicate and add the sorted the data to container

    }