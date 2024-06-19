// In your js file, declare three const variables that hold references to the input, button, and list elements.
const favChap = document.querySelector("#favchap")
const submitButton = document.querySelector("#button") //addbutton
const elementList = document.querySelector("#list")
const CHAPTER_KEY = "chapters"

let chapterList = getChapterListFromStorage()
chapterList.forEach(addItem)


function getChapterListFromStorage() {
    let chapterString = localStorage.getItem(CHAPTER_KEY)
    if (chapterString == null) {
        return []
    }
    return JSON.parse(chapterString)
}

// Create a click event listener for the Add Chapter button using addEventListener and an anonymous function or arrow function.
submitButton.addEventListener("click", () => {
    if (favChap.value == "") {
        favChap.focus();
        return;
    }
    addItem(favChap.value)
    chapterList.push(favChap.value)
    updateLocalStorage()
    favChap.value = ""
})


function updateLocalStorage() {
    localStorage.setItem(CHAPTER_KEY, JSON.stringify(chapterList))
}

function addItem(item) {
    let liElement = document.createElement("li");
    let deleteButton = document.createElement("button");
    liElement.textContent = item;
    liElement.setAttribute("chapter", item)
    deleteButton.innerHTML = "❌";
    liElement.append(deleteButton); //newitem
    elementList.append(liElement);
    deleteButton.addEventListener("click", () => {
        let chapter = liElement.getAttribute("chapter")
        chapterList = chapterList.filter(x => x != chapter)
        updateLocalStorage()
        liElement.remove();
        favChap.focus();
    })
}