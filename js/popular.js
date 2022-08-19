const themeNSearch = document.querySelector("#themeNSearch");
const search = document.querySelector("#search");
const navBar = document.querySelector(".navBar");
const input = document.querySelector("#searchInput");
const inputDiv = document.querySelector("#searchInputDiv");
const movies = document.querySelector(".movies");
const card = document.querySelector(".card");
const cardGenres = document.querySelector(".cardGenres");
const ecardOuter = document.querySelector(".ecardOuter");
const expandedCard = document.querySelector(".expandedCard");
const ecardClose = document.querySelector("#ecardClose");
const ecardImg = document.querySelector("#ecardImg");
const ecardTitle = document.querySelector("#ecardTitle");
const ecardTagline = document.querySelector("#ecardTagline");
const ecardRatingNTime = document.querySelector("#ecardRatingNTime");
const ecardGenres = document.querySelector("#ecardGenres");
const ecardOverview = document.querySelector("#ecardOverview");
const ecardWatch = document.querySelector("#ecardWatch");
const ecardVideosList = document.querySelector(".ecardVideosList");

const movieZine = document.querySelector("#movieZine");
const intro = document.querySelector(".intro");
const preButton = document.querySelector("#videoPre");
const nxtButton = document.querySelector("#videoNxt");

// const stars = document.querySelector("#stars");
// const starsAfter = window.getComputedStyle(stars, ':after');
// const stars2 = document.querySelector("#stars2");
// const stars2After = window.getComputedStyle(stars2, ':after');
// const stars3 = document.querySelector("#stars3");
// const stars3After = window.getComputedStyle(stars3, ':after');
let pages = 1;
let margin = 0;




movieZine.addEventListener("click", () => {
    window.location.href = 'https://akshay-0706.github.io/MovieZine/';
})

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let color = params.theme;
if (color == null)
    color = "blue";


search.addEventListener("click", function () {
    input.focus();
    if (window.innerWidth <= 1000) {
        navBar.children[0].style.width = "100%";
        navBar.children[0].style.marginTop = "20px";
        navBar.children[0].style.textAlign = "center";
        themeNSearch.style.width = "100%";
        search.style.width = "100%";
        intro.style.paddingTop = "150px";
    }
    else {
        search.style.width = "360px";
    }
})

search.addEventListener("focusout", function () {
    if (window.innerWidth <= 480) {
        search.style.width = "25px";
    }
    else if (window.innerWidth <= 650) {
        search.style.width = "27px";
    }
    else {
    search.style.width = "40px";
    }
    if (window.innerWidth <= 1000) {
        navBar.children[0].style.width = "unset";
        navBar.children[0].style.marginTop = "0";
        navBar.children[0].style.textAlign = "start";
        themeNSearch.style.width = "unset";
        intro.style.paddingTop = "100px";
    }
})

function setOverview(card) {

    card.addEventListener("mouseover", function () {
        card.children[0].style.opacity = "0.4";
        card.children[1].style.opacity = "0.4";
        card.children[2].style.opacity = "1";
    })

    card.addEventListener("mouseout", function () {
        card.style.opacity = "1";
        card.children[0].style.opacity = "1";
        card.children[1].style.opacity = "1";
        card.children[2].style.opacity = "0";
    })

}

const base_url = "https://api.themoviedb.org/3";
const popular = "/movie/popular?sort_by=popularity.desc&language=en-US&page=";
const api_key = "ccc26339ecf7fc6dfb4177f12b602ced";
const image_path = "https://image.tmdb.org/t/p/w500";
const url = base_url + popular + pages + "&api_key=" + api_key;

// console.log(url)
function loadMovies(url) {
    axios.get(url)
        .then(res => {
            showMovies(res.data);
        })
}

loadMovies(url);

function getColor(rating) {
    if (rating >= 8)
        return "greenyellow";
    else if (rating < 8 && rating >= 5)
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

    if (!adult && parseInt(release_date.split("-")[0]) >= 2018 && vote_average >= 3) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML =
            `<img class="cardImg"
                src= "${poster_path}"
                alt="Poster not found!">
            <div class="cardInfo" >
                <div class="cardInfoExtra">
                    <div class="cardTitle">${title} (${release_date.split("-")[0]})</div>
                    <span class="cardRating ${getColor(vote_average)}">${vote_average}</span>
                </div>
                <ul class="cardGenres">
                </ul>
            </div>
            <div class="cardOverview">
                <div>Overview</div>
                <div class="overview">${overview}</div>
            </div>`;
        movies.appendChild(card);
        setOverview(card);

        return card;
    }
    else
        return null;
}

function showMovies(data) {
    data.results.forEach(movie => {
        const card = appendCard(movie);
        if (card != null) {
            card.addEventListener("click", function () {
                moreInfo(card, movie);
            });
            let count = movie.genre_ids.length > 5 ? 5 : movie.genre_ids.length;
            for (let i = 0; i < count; i++) {
                const li = document.createElement("li");
                li.innerHTML = getCategory(movie.genre_ids[i]);
                card.children[1].children[1].appendChild(li);
            }
        }
    });
}

window.addEventListener("scroll", () => {
    // console.log(starsAfter.top);
    // starsAfter.top = "2000px";
    // starsAfter['top'] = toString(document.documentElement.scrollHeight);
    // console.dir(starsAfter['top']);
    // stars2.style.top = toString(document.documentElement.scrollHeight);
    // stars3.style.top = toString(document.documentElement.scrollHeight);

    if (window.scrollY != 0) {

        // navBar.style.position = "fixed";
        navBar.style.backgroundColor = "rgba(2, 7, 22, 0.623)";
        navBar.style.backdropFilter = "blur(8px)";
        if (document.activeElement != input)
            navBar.children[0].style.width = "50%";
        navBar.children[1].style.display = "none";
    }
    else {
        // navBar.style.position = "unset";
        navBar.style.backgroundColor = "unset";
        navBar.style.backdropFilter = "unset";
        if (document.activeElement != input)
            navBar.children[0].style.width = "unset";
        navBar.children[1].style.display = "flex";

    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3000) {
        // for (let i = 0; i < 10; i++) {
        // console.log(pages)
        pages += 1;
        let randomUrl = base_url + popular + pages + "&api_key=" + api_key;
        loadMovies(randomUrl);
        // }
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

        const queryUrl = base_url + "/search/movie?api_key=" + api_key + "&query=" + query + "&sort_by=popularity.desc";
        loadMovies(queryUrl);
    }
})





async function moreInfo(card, movie) {
    // console.log(card);
    // card.classList.add("expandedCard");

    await addExpandedCardDetails(card, movie);

    // await $(document).ready(function () {
    //     $('.ecardVideosList').slick({
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         variableWidth: true
    //     });
    // });

    if (ecardVideosList.childElementCount != 0) {
        ecardWatch.style.display = "block";

        const firstChild = ecardVideosList.firstChild;

        const totalWidth = ecardVideosList.clientWidth;
        const videosWidth = firstChild.clientWidth * ecardVideosList.childElementCount;

        if (videosWidth - totalWidth > 0) {
            nxtButton.style.opacity = "0.4";
            nxtButton.style.visibility = "visible";
        }
        else {
            nxtButton.style.opacity = "0";
            nxtButton.style.visibility = "hidden";
        }
    }
    else {
        ecardWatch.style.display = "none";
    }

    ecardOuter.style.opacity = "1";
    ecardOuter.style.visibility = "unset";
    navBar.classList.add("blurred");
    intro.classList.add("blurred");
    movies.classList.add("blurred");
}

ecardClose.addEventListener("click", remove);

async function remove() {

    // await $(document).ready(function () {
    //     $('.ecardVideosList').slick("unslick");
    // });

    ecardVideosList.style.marginLeft = "0px";
    preButton.style.opacity = "0";
    preButton.style.visibility = "hidden";
    margin = 0;

    ecardOuter.style.opacity = "0";
    ecardOuter.style.visibility = "hidden";
    navBar.classList.remove("blurred");
    intro.classList.remove("blurred");
    movies.classList.remove("blurred");
}

async function addExpandedCardDetails(card, movie) {
    if (window.innerWidth > 480)
        ecardImg.src = card.children[0].currentSrc;
    else
        expandedCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(4, 8, 22, 0.8)), url("${card.children[0].currentSrc}")`;

    ecardTitle.innerHTML = card.children[1].children[0].children[0].innerHTML;
    ecardOverview.innerHTML = card.children[2].children[1].innerHTML;
    const rating = card.children[1].children[0].children[1].innerHTML;
    ecardGenres.innerHTML = "";
    for (const genres of movie.genre_ids) {
        const li = document.createElement("li");
        li.innerHTML = getCategory(genres);
        li.addEventListener('click', function () {
            window.location.href = `genre.html?id=${genres}&theme=${color}`;
        });
        ecardGenres.appendChild(li);
    }
    const getMovie = base_url + "/movie/" + movie.id + "?api_key=" + api_key + "&language=en-US&append_to_response=videos";

    await axios.get(getMovie)
        .then(res => {
            const data = res.data;
            ecardTagline.innerHTML = data.tagline;
            ecardRatingNTime.innerHTML = rating + " | " + data.runtime + " min";
            ecardVideosList.innerHTML = "";
            let count = 0;
            let arr = [];
            if (data.videos != null)
                for (const result of data.videos.results) {
                    if (count == 10)
                        break;
                    if (result.site == "YouTube" && result.type == "Trailer" || result.type == "Teaser") {
                        {
                            arr[count] = result.key;
                            if (count == 0)
                                arr[count] += "?autoplay=1&mute=1";
                            count++;
                        }
                    }
                }
            for (const key of arr) {
                const div = document.createElement("div");

                div.innerHTML = `<iframe class="ecardVideo" src="https://www.youtube.com/embed/${key}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`;
                ecardVideosList.appendChild(div);
            }
        })
}

preButton.addEventListener("click", function () {
    const firstChild = ecardVideosList.firstChild;

    // previousOffset = firstChild.clientWidth + ecardVideosList.offsetLeft;

    // console.log(firstChild.offsetLeft);
    // console.log(ecardVideosList.offsetLeft);

    margin += parseInt(firstChild.clientWidth);
    ecardVideosList.style.marginLeft = `${margin}px`;

    nxtButton.style.opacity = "0.4";
    nxtButton.style.visibility = "visible";

    if (firstChild.clientWidth + ecardVideosList.offsetLeft >= 0) {
        preButton.style.opacity = "0";
        preButton.style.visibility = "hidden";
    }
})

nxtButton.addEventListener("click", function () {
    const firstChild = ecardVideosList.firstChild;
    const lastChild = ecardVideosList.lastChild;

    margin -= firstChild.clientWidth;
    ecardVideosList.style.marginLeft = `${margin}px`;

    console.log(lastChild.offsetLeft + lastChild.clientWidth);
    console.log(ecardVideosList.clientWidth + expandedCard.offsetLeft);

    preButton.style.opacity = "0.4";
    preButton.style.visibility = "visible";

    if (lastChild.offsetLeft <= ecardVideosList.clientWidth + expandedCard.offsetLeft) {
        nxtButton.style.opacity = "0";
        nxtButton.style.visibility = "hidden";
    }

})





const themeColor = document.querySelector("#themeColor");
const tab = document.querySelector('meta[name="theme-color"]');

if (color == "blue") {
    document.body.classList.remove("themePurple");
    document.body.classList.remove("themeGreen");
    themeColor.style.backgroundColor = "#5a78ff";
    tab.setAttribute('content', '#060d24');
    color = "blue";
}
else if (color == "green") {
    document.body.classList.add("themeGreen");
    themeColor.style.backgroundColor = "#5aff5a";
    tab.setAttribute('content', '#051f0f');
    color = "green";
}
else {
    document.body.classList.add("themePurple");
    themeColor.style.backgroundColor = "#c78bff";
    tab.setAttribute('content', '#180620');
    color = "purple";
}

theme.addEventListener("click", () => {

    if (themeColor.style.backgroundColor == "rgb(90, 120, 255)") {
        document.body.classList.add("themeGreen");
        themeColor.style.backgroundColor = "#5aff5a";
        tab.setAttribute('content', '#051f0f');
        color = "green";
    }
    else if (themeColor.style.backgroundColor == "rgb(90, 255, 90)") {
        document.body.classList.add("themePurple");
        themeColor.style.backgroundColor = "#c78bff";
        tab.setAttribute('content', '#180620');
        color = "purple";
    }
    else {
        document.body.classList.remove("themePurple");
        document.body.classList.remove("themeGreen");
        themeColor.style.backgroundColor = "#5a78ff";
        tab.setAttribute('content', '#060d24');
        color = "blue";
    }
})

setInterval(() => {
    themeColor.classList.toggle("opacityGone");
}, 1000);

// const hours = new Date().getHours();
// const isGreen = hours > 0 && hours <= 8;
// const isPurple = hours > 16 && hours <= 0;

// if (isGreen) {
//     document.body.classList.toggle("themeGreen");
// }
// else if (isPurple) {
//     document.body.classList.toggle("themePurple");
// }



const home = document.querySelector(".home");
home.addEventListener("click", () => {
    window.location.href = `../index.html?theme=${color}`;
})

const latest = document.querySelector(".upcoming");
latest.addEventListener("click", () => {
    window.location.href = `upcoming.html?theme=${color}`;
})







// const about = document.querySelector(".about");
// about.addEventListener("click", () => {
//     window.location.href = 'about.html';
// })

function getCategory(id) {
    switch (id) {
        case 28:
            return "Action"
            break;
        case 12:
            return "Adventure"
            break;
        case 16:
            return "Animation"
            break;
        case 35:
            return "Comedy"
            break;
        case 80:
            return "Crime"
            break;
        case 18:
            return "Drama"
            break;
        case 10751:
            return "Family"
            break;
        case 14:
            return "Fantasy"
            break;
        case 36:
            return "History"
            break;
        case 27:
            return "Horror"
            break;
        case 10402:
            return "Music"
            break;
        case 9648:
            return "Mystery"
            break;
        case 10749:
            return "Romance"
            break;
        case 878:
            return "Sci-Fi"
            break;
        case 53:
            return "Thriller"
            break;
        case 10752:
            return "War"
            break;

        default:
            id = 27;
            return "Horror"
            break;
    }
}