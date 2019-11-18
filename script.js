window.addEventListener("DOMContentLoaded", checkData);
const modal = document.querySelector(".modalbg");
//modal.style.display = "none";
function checkData() {
    if (document.querySelector("#movies")) {
        getData();
    }
}

function getData() {
    //console.log("getData")

    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100&categories=13")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //    console.log(myData);
    //1 loop
    myData.forEach(showMovie)



}

function showMovie(movie) {
    //    console.log(movie)

    const imgPath = movie._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    //
    //
    const template = document.querySelector("template").content;
    const movieCopy = template.cloneNode(true);
    //    //3. textcontent & innerHTML
    const article = movieCopy.querySelector("article");

    const headlinefront = movieCopy.querySelector(".headlinefront");
    headlinefront.textContent = movie.title.rendered;
    const timefront = movieCopy.querySelector(".timefront");
    timefront.textContent = movie.event_time;
    const datefront = movieCopy.querySelector(".datefront");
    datefront.textContent = movie.event_date;
    const locationfront = movieCopy.querySelector(".locationfront");
    locationfront.textContent = movie.where;
    const pricefront = movieCopy.querySelector(".pricefront");
    pricefront.textContent = movie.price;
    const container = movieCopy.querySelector("container");
    const content = movieCopy.querySelector("content");
    const img = movieCopy.querySelector(".img");
    img.style.backgroundImage = `url(${imgPath})`;

    //-----------------Modal----------------------
    article.addEventListener("click", function () {
        console.log(movie);
        const modal = document.querySelector(".modalbg");
        modal.style.display = "block";
        const modalheadlinefront = document.querySelector(".modalheadlinefront");
        modalheadlinefront.textContent = movie.title.rendered;
        const modaltimefront = document.querySelector(".modaltimefront");
        modaltimefront.textContent = movie.event_time;
        const modaldatefront = document.querySelector(".modaldatefront");
        modaldatefront.textContent = movie.event_date;
        const modallocationfront = document.querySelector(".modallocationfront");
        modallocationfront.textContent = movie.where;
        const modalpricefront = document.querySelector(".modalpricefront");
        modalpricefront.textContent = movie.price;
        const modalimg = document.querySelector(".modalimg");
        modalimg.style.backgroundImage = `url(${imgPath})`;
        const modaldescription = document.querySelector(".modaldescription")
        modaldescription.innerHTML = movie.content.rendered;
        const body = document.querySelector("body");
        body.classList.add("modalopen");
        const exit = document.querySelector(".exit");
        exit.addEventListener("click", function () {
            modal.style.display = "none";
            body.classList.remove("modalopen");
        });
    });

    document.querySelector("#movies").appendChild(movieCopy)

}

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const navexit = document.querySelector(".navexit");
menu.addEventListener("click", function () {
    nav.style.width = "50%";
});
navexit.addEventListener("click", function () {
    nav.style.width = "0%";
});
