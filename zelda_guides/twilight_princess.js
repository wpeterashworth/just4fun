document.getElementById("hide-or-show-list").addEventListener("click", showHeartPieces);
document.getElementById("hide-or-show-bottles").addEventListener("click", showEmptyBottles);
document.getElementById("hide-or-show-bugs").addEventListener("click", showBugs);

function showHeartPieces() {
    let list = document.querySelector("#heart-pieces-list");
    if (list.style.display === "none") {
        list.style.display = "block";
      } else {
        list.style.display = "none";
      }
    }

function showEmptyBottles() {
    let list2 = document.querySelector("#bottles-list");
    if (list2.style.display === "none") {
        list2.style.display = "block";
      } else {
        list2.style.display = "none";
      }
}

function showBugs() {
    let list3 = document.querySelector("#bugs-list");
    if (list3.style.display === "none") {
        list3.style.display = "block";
      } else {
        list3.style.display = "none";
      }
}

showHeartPieces()
showEmptyBottles()
showBugs()