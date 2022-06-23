const search = document.querySelector("#search");
const navBar = document.querySelector(".navBar");
const input = document.querySelector("#searchInput");
const inputDiv = document.querySelector("#searchInputDiv");
const movies = document.querySelector(".movies");
const moviz = document.querySelector("#moviz");

moviz.addEventListener("click", () => {
    window.location.href = 'https://akshay-0706.github.io/Moviz/';
})

// navBar.addEventListener("click", function (e) {
//     e.stopPropagation();
// })



search.addEventListener("click", function () {
    input.focus();
    if (window.innerWidth <= 900) {
        navBar.children[0].style.width = "100%";
        navBar.children[0].style.marginTop = "20px";
        navBar.children[0].style.textAlign = "center";
        search.style.width = "100%";
    }
    else {
        search.style.width = "360px";
    }
})

search.addEventListener("focusout", function () {
    search.style.width = "40px";
    if (window.innerWidth <= 900) {
        navBar.children[0].style.width = "unset";
        navBar.children[0].style.marginTop = "0";
        navBar.children[0].style.textAlign = "start";
    }
})

// function setOverview(card) {
//     // const cardImgs = document.querySelectorAll(".cardImg");
//     // const cardInfos = document.querySelectorAll(".cardInfo");

//     card.addEventListener("mouseover", function () {
//         card.children[0].style.opacity = "0.4";
//         card.children[1].style.opacity = "0.4";
//         card.children[2].style.opacity = "1";
//         console.log(card.children[1].children[1].innerHTML);
//     })

//     card.addEventListener("mouseout", function () {
//         card.style.opacity = "1";
//         card.children[0].style.opacity = "1";
//         card.children[1].style.opacity = "1";
//         card.children[2].style.opacity = "0";
//     })
//     if (card.children[1].children[1].innerHTML >= 9)
//         card.children[1].children[1].style.color = "greenyellow";
//     else if (card.children[1].children[1].innerHTML < 9 && card.children[1].children[1].innerHTML >= 7)
//         card.children[1].children[1].style.color = "orange";
//     else
//         card.children[1].children[1].style.color = "red";

// }

const base_url = "https://api.themoviedb.org/3";
const popular = "/discover/movie?sort_by=popularity.desc";
const api_key = "ccc26339ecf7fc6dfb4177f12b602ced";
const image_path = "https://image.tmdb.org/t/p/w500";
const url = base_url + popular + "&api_key=" + api_key;

function loadMovies(url) {
    axios.get(url)
        .then(res => {
            showMovies(res.data);
        })
}

loadMovies(url);

function getColor(rating) {
    if (rating >= 9)
        return "greenyellow";
    else if (rating < 9 && rating >= 7)
        return "orange";
    else
        return "red";
}

function appendCard(movie) {

    let { title, poster_path, vote_average, overview, adult, release_date } = movie;
    if (!overview)
        overview = "No overview available!";
    if (poster_path == null)
        poster_path = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";
    else
        poster_path = image_path + poster_path;

    if (!adult && parseInt(release_date.split("-")[0]) >= 2020 && vote_average >= 5) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML =
            `<img class="cardImg"
                src= "${poster_path}"
                alt="Poster not found!">
            <div class="cardInfo" >
                <div class="cardTitle">${title} (${release_date.split("-")[0]})</div>
                <span class="cardRating ${getColor(vote_average)}">${vote_average}</span>
            </div >
            <div class="cardOverview">
                <div>Overview</div>
                <div class="overview">${overview}</div>
            </div>`
        movies.appendChild(card);
    }
}

function showMovies(data) {
    data.results.forEach(movie => {
        appendCard(movie);
    });
}

window.addEventListener("scroll", () => {
    if (window.scrollY != 0) {
        // position: fixed;
        // background-color: rgba(2, 7, 22, 0.623);
        // -webkit-backdrop-filter: blur(8px);
        // backdrop-filter: blur(8px);
        navBar.style.position = "fixed";
        navBar.style.backgroundColor = "rgba(2, 7, 22, 0.623)";
        navBar.style.backdropFilter = "blur(8px)";
        if (document.activeElement != input)
            navBar.children[0].style.width = "50%";
        navBar.children[1].style.display = "none";
    }
    else {
        navBar.style.position = "unset";
        navBar.style.backgroundColor = "unset";
        navBar.style.backdropFilter = "unset";
        if (document.activeElement != input)
            navBar.children[0].style.width = "unset";
        navBar.children[1].style.display = "unset";

    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1000) {
        for (let i = 0; i < 1000; i++) {
            const randomId = Math.random() * 949999 + 50000;
            const randomUrl = base_url + "/movie/" + randomId + "?api_key=" + api_key + "&language=en-US";
            getMovie(randomUrl)
        }
    }
})

function getMovie(url) {
    axios.get(url)
        .then(res => {
            appendCard(res.data);
        });

}

// Search queries
input.addEventListener("input", () => {
    let query = input.value;
    const cards = document.querySelectorAll(".card");
    for (const card of cards) {
        card.remove();
    }
    if (query.length == 0) {
        loadMovies(url);
    }
    else {

        query = query.replaceAll(" ", "+");
        console.log(query);

        const queryUrl = base_url + "/search/movie?api_key=" + api_key + "&query=" + query + "&sort_by=popularity.desc";
        loadMovies(queryUrl);
    }
})

// Work in progress
const inactive = document.querySelectorAll(".inactiveNavItem");
for (const links of inactive) {
    links.addEventListener("click", () => {
        alert("This feature will be available soon!");
    })
}