const mockAPI = "https://jsonplaceholder.typicode.com/photos"

const preloader = document.querySelector(".preloader");
const galleries = document.querySelector(".gallery-ul");
const error = document.querySelector(".error");
const pagesNavigation = document.querySelector(".pages-nav");
const previousButton = document.querySelector(".previous-button");
const pageNumberElement = document.querySelector(".page-number");
const nextButton = document.querySelector(".next-button");
let galleryList;
let pageNumber = 0;

const createGallery = (gallery) => {
    const {
        title,
        url} = gallery

    return `<div class="gallery">
                <p>${title}</p>
                <img src="${url}" alt="${title}">
        </div>`;
};

window.addEventListener("load", async () => {
    preloader.style.display = "block";
    pagesNavigation.style.display = "none";
    galleries.style.display = "none";
    error.style.display = "none";

    await fetch(mockAPI)
        .then(r => r.json())
        .then(data => {
            let min = getRandomNumber(0, 1000);
            let max = min + getRandomNumber(50, 250);
            galleryList = data.slice(min, max);

            showCurrentPage()
            pagesNavigation.style.display = "flex";
            galleries.style.display = "flex";
            preloader.style.display = "none";
            error.style.display = "none";
        })
        .catch(() => {
            error.style.display = "block";
            pagesNavigation.style.display = "none";
            preloader.style.display = "none";
            galleries.style.display = "none";
        });
});

const showCurrentPage = () => {
    galleries.innerHTML = "";
    let amount = 2

    let startElementNumber = pageNumber * amount;
    let endElementNumber = Math.min(startElementNumber + amount, galleryList.length - 1)

    galleryList.slice(startElementNumber, endElementNumber)
        .forEach(d => galleries.insertAdjacentHTML("afterbegin", createGallery(d)));

    previousButton.style.display = startElementNumber === 0 ? "none" : "block";
    pageNumberElement.textContent = (pageNumber + 1).toString();
    nextButton.style.display = endElementNumber === galleryList.length - 1 ? "none" : "block";
}

previousButton.addEventListener("click", () => {
    pageNumber--;
    showCurrentPage()
})

nextButton.addEventListener("click", () => {
    pageNumber++;
    showCurrentPage()
})

const getRandomNumber = (min = 0, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}