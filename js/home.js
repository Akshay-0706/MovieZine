const moviz = document.querySelector("#movieZine");
movieZine.addEventListener("click", () => {
    window.location.href = 'https://akshay-0706.github.io/MovieZine/html/';
})

// const themeNSearch = document.querySelector("#themeNSearch");
// themeNSearch.style.opacity = "0";
// themeNSearch.style.visibility = "hidden";

const popular = document.querySelector(".popular");
popular.addEventListener("click", () => {
    window.location.href = 'html/popular.html';
})

const latest = document.querySelector(".upcoming");
latest.addEventListener("click", () => {
    window.location.href = 'html/upcoming.html';
})

// const about = document.querySelector(".about");
// about.addEventListener("click", () => {
//     window.location.href = 'about.html';
// })

// window.addEventListener("scroll", function () {
//     const value = this.window.scrollY;
//     const bg = this.document.querySelector("#bg");
//     bg.style.top = `${value}px`;
// })

const cards = document.querySelector(".cards");

const stars = document.querySelector("#stars");
const stars2 = document.querySelector("#stars2");
const stars3 = document.querySelector("#stars3");

const navBar = document.querySelector(".navBar");

if (window.innerWidth <= 480) {
    navBar.children[0].style.width = "100%";
    navBar.children[0].style.textAlign = "center";
}
else {
    navBar.children[0].style.width = "unset";
    navBar.children[0].style.textAlign = "start";
}

window.addEventListener("resize", function () {
    if (window.innerWidth <= 480) {
        navBar.children[0].style.width = "100%";
        navBar.children[0].style.textAlign = "center";
    }
    else {
        navBar.children[0].style.width = "unset";
        navBar.children[0].style.textAlign = "start";
    }
});



// console.log(document.body.scrollHeight);
// console.dir(stars);
// stars.style.top = document.body.scrollHeight;
// stars2.style.top = document.body.scrollHeight;
// stars3.style.top = document.body.scrollHeight;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let color = params.theme;
if (color == null)
    color = "blue";

for (const card of cards.children) {
    card.addEventListener("click", () => {
        console.log(card.id);
        window.location.href = `html/genre.html?id=${getCategory(card.id)}&theme=${color}`;
    })
}

function getCategory(id) {
    switch (id) {
        case "action":
            return 28
            break;
        case "adventure":
            return 12
            break;
        case "animation":
            return 16
            break;
        case "comedy":
            return 35
            break;
        case "crime":
            return 80
            break;
        case "drama":
            return 18
            break;
        case "family":
            return 10751
            break;
        case "fantasy":
            return 14
            break;
        case "history":
            return 36
            break;
        case "horror":
            return 27
            break;
        case "music":
            return 10402
            break;
        case "mystery":
            return 9648
            break;
        case "romance":
            return 10749
            break;
        case "scifi":
            return 878
            break;
        case "thriller":
            return 53
            break;
        case "war":
            return 10752
            break;

        default:
            return 27
            break;
    }
}