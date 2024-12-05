let menuButton = document.querySelector("#menu");
let navList = document.querySelector("nav ul")
menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open")
    navList.classList.toggle("open")
})

