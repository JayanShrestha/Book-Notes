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

//Function for sorting the book data according to book title ascending order
function sortDataTitleAsc(){
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

    //Function for sorting the book data according to book title descending order
    function sortDataTitleDesc(){
        const container = document.getElementById('collection');
        const cards = Array.from(container.getElementsByClassName('book-card'));

        cards.sort((a,b)=>{
            const titleA = a.querySelector('h3').innerText.toLowerCase();
            const titleB = b.querySelector('h3').innerText.toLowerCase();
            return titleB.localeCompare(titleA);
        });

        const fragment = document.createDocumentFragment();
        cards.forEach(card=>fragment.appendChild(card));

        //push everything on the screen at once
        container.appendChild(fragment);


    }
//trigger the toast message
const message ="User Exists! Please Try Logging in instead.";//message to display on toast message
function showToast(message, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toastContainer.remove();
        }, 1000); // Match hide animation duration
    }, duration);
}
