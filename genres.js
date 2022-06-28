const search = document.querySelector("#search");
search.style.opacity = "0";
search.style.visibility = "hidden";

const home = document.querySelector(".home");
home.addEventListener("click", () => {
    window.location.href = 'index.html';
})

const latest = document.querySelector(".upcoming");
latest.addEventListener("click", () => {
    window.location.href = 'upcoming.html';
})

const main = document.querySelector("#main");

window.addEventListener("scroll", function () {
    const value = this.window.scrollY;
    const bg = this.document.querySelector("#bg");
    bg.style.top = `${value}px`;
})

const cards = document.querySelector(".cards");

for (const card of cards.children) {
    card.addEventListener("click", () => {
        console.log(card.id);
        window.location.href = `genre.html?id=${getCategory(card.id)}`;
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