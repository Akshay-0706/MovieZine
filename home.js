const search = document.querySelector("#search");
const navBar = document.querySelector(".navBar");
const input = document.querySelector("#searchInput");
const inputDiv = document.querySelector("#searchInputDiv");
const movies = document.querySelector(".movies");

search.addEventListener("click", function () {
    search.style.width = "360px";
    input.focus();
})

search.addEventListener("focusout", function () {
    search.style.width = "40px";
})

function setOverview(card) {
    // const cardImgs = document.querySelectorAll(".cardImg");
    // const cardInfos = document.querySelectorAll(".cardInfo");

    card.addEventListener("mouseover", function () {
        card.children[0].style.opacity = "0.4";
        card.children[1].style.opacity = "0.4";
        card.children[2].style.opacity = "1";
        console.log(card.children[1].children[1].innerHTML);
    })

    card.addEventListener("mouseout", function () {
        card.style.opacity = "1";
        card.children[0].style.opacity = "1";
        card.children[1].style.opacity = "1";
        card.children[2].style.opacity = "0";
    })
    if (card.children[1].children[1].innerHTML >= 8)
        card.children[1].children[1].style.color = "greenyellow";
    else if (card.children[1].children[1].innerHTML < 8 && card.children[1].children[1].innerHTML >= 5)
        card.children[1].children[1].style.color = "orange";
    else
        card.children[1].children[1].style.color = "red";

}


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

function showMovies(data) {
    data.results.forEach(movie => {
        const { title, poster_path, vote_average, overview, release_date } = movie;
        const m1 = document.createElement("div");
        m1.classList.add("card");
        m1.innerHTML =
            `<img class="cardImg"
            src= "${image_path + poster_path}"
            alt="Poster not found for ${title}">
        <div class="cardInfo" >
            <div class="cardTitle">${title} (${release_date.split("-")[0]})</div>
            <span class="cardRating">${vote_average}</span>
        </div >
        <div class="cardOverview">
            <div>Overview</div>
            <div class="overview">${overview}</div>
        </div>`
        movies.appendChild(m1);
    });
    const cards = document.querySelectorAll(".card");
    for (const card of cards) {
        setOverview(card);
    }
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
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
            const { title, poster_path, vote_average, overview, adult, release_date } = res.data;
            if (!adult && parseInt(release_date.split("-")[0]) >= 2020 && poster_path != null && vote_average >= 2) {
                const m1 = document.createElement("div");
                m1.classList.add("card");
                m1.innerHTML =
                    `<img class="cardImg"
                src= "${image_path + poster_path}"
                alt="Poster not found for ${title}">
            <div class="cardInfo" >
                <div class="cardTitle">${title} (${release_date.split("-")[0]})</div>
                <span class="cardRating">${vote_average}</span>
            </div >
            <div class="cardOverview">
                <div>Overview</div>
                <div class="overview">${overview}</div>
            </div>`
                movies.appendChild(m1);
                setOverview(m1);
            }
        })
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