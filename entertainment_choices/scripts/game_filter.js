function filterGames() {
//     let filter = document.querySelector("#filter").value;
//     let allGames = {
//         singlePlayerGame1: document.querySelector(".singleplayer-game-1").textContent,
//         singlePlayerGame2: document.querySelector(".singleplayer-game-2").textContent,
//         // singlePlayerGame3: document.querySelector(".singleplayer-game-3").textContent,
//         // singlePlayerGame4: document.querySelector(".singleplayer-game-4").textContent,
//         // singlePlayerGame5: document.querySelector(".singleplayer-game-5").textContent,
//         // singlePlayerGame6: document.querySelector(".singleplayer-game-6").textContent,
//         // singlePlayerGame7: document.querySelector(".singleplayer-game-7").textContent,
//         // singlePlayerGame8: document.querySelector(".singleplayer-game-8").textContent,
//         // singlePlayerGame9: document.querySelector(".singleplayer-game-9").textContent,
//         // singlePlayerGame10: document.querySelector(".singleplayer-game-10").textContent,
//         // singlePlayerGame11: document.querySelector(".singleplayer-game-11").textContent,
//         // singlePlayerGame12: document.querySelector(".singleplayer-game-12").textContent,
//     }
//     let fiveStarGames = document.querySelectorAll(".five_stars");
//     let uncommonGames = document.querySelectorAll(".uncommon");
//     let multiPlayerGames = document.querySelectorAll(".multi");
//     let allGames = document.querySelector(".game-columns").innerText;
//     switch(filter) {
//         case "single":
//             let output = 
//                 singlePlayerGames.filter(employee => employee.department == "IT");
//                 for (let i = 0; i < output.length; i++) {
//                     console.log(output[i].name)
//         break
//     }
//     console.log(allGames);
//     console.log(singlePlayerGames);
// }
let singlePlayerGames = {
    singlePlayerGame1: document.querySelector(".singleplayer-game-1").textContent,
    singlePlayerGame2: document.querySelector(".singleplayer-game-2").textContent,
}

let multiplayerGames = {
    multiplayerGame: document.querySelector(".multiplayerGame").textContent
}
let allGames = [
   {style: singlePlayerGames,
    multiplayerGames }
    ]
let output = 
    allGames.filter(game => game.style == `${singlePlayerGames}`);
    for (let i = 0; i < output.length; i++) {
        console.log(output[i].name)
}
}
filterGames();

