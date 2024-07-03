const currentDate = new Date();
const currentYear = currentDate.getFullYear();

let year = document.querySelector("#date");
year.innerHTML = `&copy${currentYear}`;

let lastModifiedDate = document.querySelector("#lastModified");
lastModifiedDate.textContent = new Date(document.lastModified);

let visits = getNumberOfVisits()
let visitsSpan = document.querySelector("#visits")
visitsSpan.innerText = visits

function getNumberOfVisits() {
    let visitCount = localStorage.getItem("site-visits")
    if (visitCount == null) {
        visitCount = 0
    }
    else {
        visitCount = parseInt(visitCount)
    }
    visitCount = visitCount + 1
    localStorage.setItem("site-visits", `${visitCount}`)
    return visitCount
}

//dark mode
let darkButton = document.querySelector("#darkMode");
darkButton.addEventListener('click', () => {
    darkButton.classList.toggle("dark")
    if (darkButton.classList.contains("dark")) {
        document.documentElement.style.setProperty('--text-color-light', 'white');
        document.documentElement.style.setProperty('--text-color-dark', 'black')
        document.documentElement.style.setProperty('--background-color', '#A9B3CE');
        document.documentElement.style.setProperty('--accent-color', '#B24C63');
        document.documentElement.style.setProperty('--header-color', '#357DED');
    }
    else {
        document.documentElement.style.setProperty('--text-color-light', 'black');
        document.documentElement.style.setProperty('--text-color-dark', 'white');
        document.documentElement.style.setProperty('--background-color', '#474954');
        document.documentElement.style.setProperty('--accent-color', '#357DED');
        document.documentElement.style.setProperty('--header-color', '#B24C63');
    }
})