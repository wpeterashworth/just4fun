const moviesURL = "https://wpeterashworth.github.io/wdd230/final/data/movies.JSON"
const movieInfo = document.querySelector("#movie-info")

async function apiFetchMovies() {
    try {
        const response = await fetch(moviesURL)
        if (response.ok) {
            const movieData = await response.json()
            displayMovieInfo(movieData)
        }
        else {
            throw Error(await response.text())
        }
    }
    catch (error) {
        console.log(error)
    }
}


function displayMovieInfo(movieData) {
    let fellowship = movieData.docs[6]
    let towers = movieData.docs[5]
    let king = movieData.docs[7]

    let fellowshipData = document.createElement("p")
    let towersData = document.createElement("p")
    let kingData = document.createElement("p")

    fellowshipData.textContent = `${fellowship.name} is ${fellowship.runtimeInMinutes} minutes long, and recieved $${fellowship.boxOfficeRevenueInMillions} million in box office revenue, with a budget of $${fellowship.budgetInMillions} million. The movie has been nominated for ${fellowship.academyAwardNominations} academy awards and has won ${fellowship.academyAwardWins} of them. It has received a rating of ${fellowship.rottenTomatoesScore}/100 on rotten tomatoes.`
    towersData.textContent = `${towers.name} is ${towers.runtimeInMinutes} minutes long, and recieved $${towers.boxOfficeRevenueInMillions} million in box office revenue, with a budget of $${towers.budgetInMillions} million. The movie has been nominated for ${towers.academyAwardNominations} academy awards and has won ${towers.academyAwardWins} of them. It has received a rating of ${towers.rottenTomatoesScore}/100 on rotten tomatoes.`
    kingData.textContent = `${king.name} is ${king.runtimeInMinutes} minutes long, and recieved $${king.boxOfficeRevenueInMillions} million in box office revenue, with a budget of $${king.budgetInMillions} million. The movie has been nominated for ${king.academyAwardNominations} academy awards and has won ${king.academyAwardWins} of them. It has received a rating of ${king.rottenTomatoesScore}/100 on rotten tomatoes.`

    movieInfo.appendChild(fellowshipData)
    movieInfo.appendChild(towersData)
    movieInfo.appendChild(kingData)

}

apiFetchMovies()