const currentDate = new Date();
const currentYear = currentDate.getFullYear();

let year = document.querySelector("#date");
year.innerHTML = `&copy${currentYear}`;

let lastModifiedDate = document.querySelector("#lastModified");
lastModifiedDate.textContent = new Date(document.lastModified);