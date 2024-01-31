function getRandomInt(min = 1, max = 16) {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(16);
    let randomInt = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
    displayInt(randomInt);
    return randomInt
}

function displayInt(randomInt) {
    let numberShown = document.createElement("p");
    numberShown.innerHTML = randomInt;
    document.getElementById("num_generator").appendChild(numberShown);
}

const generator = document.querySelector("#enter").addEventListener("click", getRandomInt);
