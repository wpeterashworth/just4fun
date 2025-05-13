// Game data storage
let gameLibrary = [];

// DOM elements
const genreFilter = document.getElementById('genre-filter');
const moodFilter = document.getElementById('mood-filter');
const numGamesInput = document.getElementById('num-games');
const generateBtn = document.getElementById('generate-btn');
const gamesContainer = document.getElementById('games-container');
const addGameForm = document.getElementById('add-game-form');
const showLibraryBtn = document.getElementById('show-library-btn');
const clearLibraryBtn = document.getElementById('clear-library-btn');
const loadSampleBtn = document.getElementById('load-sample-btn');
const libraryDisplay = document.getElementById('library-display');
const libraryContainer = document.getElementById('library-container');

// Initialize the app
function init() {
    loadGameLibrary();
    updateFilterOptions();
    setupEventListeners();
}

// Load game library from local storage
function loadGameLibrary() {
    const savedLibrary = localStorage.getItem('gameLibrary');
    if (savedLibrary) {
        gameLibrary = JSON.parse(savedLibrary);
    }
}

// Save game library to local storage
function saveGameLibrary() {
    localStorage.setItem('gameLibrary', JSON.stringify(gameLibrary));
}

// Update filter options based on available games
function updateFilterOptions() {
    const genres = new Set();
    const moods = new Set();
    
    gameLibrary.forEach(game => {
        genres.add(game.genre);
        moods.add(game.mood);
    });
    
    // Clear existing options (except "All")
    while (genreFilter.options.length > 1) {
        genreFilter.remove(1);
    }
    
    while (moodFilter.options.length > 1) {
        moodFilter.remove(1);
    }
    
    // Add new options
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
    
    moods.forEach(mood => {
        const option = document.createElement('option');
        option.value = mood;
        option.textContent = mood;
        moodFilter.appendChild(option);
    });
}

// Set up event listeners
function setupEventListeners() {
    generateBtn.addEventListener('click', generateGameList);
    addGameForm.addEventListener('submit', addNewGame);
    showLibraryBtn.addEventListener('click', toggleLibraryDisplay);
    clearLibraryBtn.addEventListener('click', clearLibrary);
    loadSampleBtn.addEventListener('click', loadSampleGames);
}

// Generate a randomized list of games based on filters
function generateGameList() {
    const selectedGenre = genreFilter.value;
    const selectedMood = moodFilter.value;
    const numGames = parseInt(numGamesInput.value);
    
    // Filter games based on selection
    let filteredGames = gameLibrary.filter(game => {
        const genreMatch = selectedGenre === 'all' || game.genre === selectedGenre;
        const moodMatch = selectedMood === 'all' || game.mood === selectedMood;
        return genreMatch && moodMatch;
    });
    
    // Check if we have games after filtering
    if (filteredGames.length === 0) {
        gamesContainer.innerHTML = `
            <div class="empty-state">
                No games match your selected filters. Try different filters or add more games to your library.
            </div>
        `;
        return;
    }
    
    // Randomize and limit the number of games
    const selectedGames = getRandomGames(filteredGames, numGames);
    
    // Display the selected games
    displayGames(selectedGames);
}

// Get random games from the filtered list
function getRandomGames(games, count) {
    // Make a copy to avoid modifying the original array
    const gamesCopy = [...games];
    const result = [];
    const numToSelect = Math.min(count, gamesCopy.length);
    
    for (let i = 0; i < numToSelect; i++) {
        // Get a random index
        const randomIndex = Math.floor(Math.random() * gamesCopy.length);
        // Add the randomly selected game to the result
        result.push(gamesCopy[randomIndex]);
        // Remove the selected game to avoid duplicates
        gamesCopy.splice(randomIndex, 1);
    }
    
    return result;
}

// Display the selected games
function displayGames(games) {
    gamesContainer.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-genre">Genre: ${game.genre}</p>
                <p class="game-mood">Mood: ${game.mood}</p>
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

// Add a new game to the library
function addNewGame(event) {
    event.preventDefault();
    
    const gameName = document.getElementById('game-name').value;
    const gameGenre = document.getElementById('game-genre').value;
    const gameMood = document.getElementById('game-mood').value;
    const gameImage = document.getElementById('game-image').value;
    
    const newGame = {
        name: gameName,
        genre: gameGenre,
        mood: gameMood,
        imageUrl: gameImage
    };
    
    gameLibrary.push(newGame);
    saveGameLibrary();
    updateFilterOptions();
    
    // Reset the form
    addGameForm.reset();
    
    // Show a quick confirmation
    alert(`${gameName} has been added to your library!`);
    
    // Update library display if it's currently shown
    if (!libraryDisplay.classList.contains('hidden')) {
        displayLibrary();
    }
}

// Toggle the display of the full game library
function toggleLibraryDisplay() {
    libraryDisplay.classList.toggle('hidden');
    
    if (!libraryDisplay.classList.contains('hidden')) {
        displayLibrary();
        showLibraryBtn.textContent = 'Hide Library';
    } else {
        showLibraryBtn.textContent = 'Show Full Library';
    }
}

// Display the full game library
function displayLibrary() {
    libraryContainer.innerHTML = '';
    
    if (gameLibrary.length === 0) {
        libraryContainer.innerHTML = `
            <div class="empty-state">
                Your library is empty. Add some games or load the sample library to get started.
            </div>
        `;
        return;
    }
    
    gameLibrary.forEach((game, index) => {
        const libraryItem = document.createElement('div');
        libraryItem.className = 'library-item';
        
        libraryItem.innerHTML = `
            <button class="remove-game" data-index="${index}">✕</button>
            <h4>${game.name}</h4>
            <p>Genre: ${game.genre}</p>
            <p>Mood: ${game.mood}</p>
        `;
        
        libraryContainer.appendChild(libraryItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-game').forEach(button => {
        button.addEventListener('click', removeGame);
    });
}

// Remove a game from the library
function removeGame(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    
    if (confirm(`Remove ${gameLibrary[index].name} from your library?`)) {
        gameLibrary.splice(index, 1);
        saveGameLibrary();
        updateFilterOptions();
        displayLibrary();
    }
}

// Clear the entire game library
function clearLibrary() {
    if (gameLibrary.length === 0) {
        alert('The library is already empty.');
        return;
    }
    
    if (confirm('Are you sure you want to clear your entire game library? This cannot be undone.')) {
        gameLibrary = [];
        saveGameLibrary();
        updateFilterOptions();
        
        if (!libraryDisplay.classList.contains('hidden')) {
            displayLibrary();
        }
    }
}

// Load sample games into the library
function loadSampleGames() {
    // Confirm if the library is not empty
    if (gameLibrary.length > 0) {
        if (!confirm('Loading sample games will replace your current library. Continue?')) {
            return;
        }
    }
    
    // Sample game data
    const sampleGames = [
        {
            name: "The Legend of Zelda: Breath of the Wild",
            genre: "Action-Adventure",
            mood: "Exploration",
            imageUrl: "https://via.placeholder.com/300x400?text=Zelda:+BOTW"
        },
        {
            name: "Red Dead Redemption 2",
            genre: "Action-Adventure",
            mood: "Story-focused",
            imageUrl: "https://via.placeholder.com/300x400?text=RDR2"
        },
        {
            name: "Stardew Valley",
            genre: "Simulation",
            mood: "Relaxing",
            imageUrl: "https://via.placeholder.com/300x400?text=Stardew+Valley"
        },
        {
            name: "Doom Eternal",
            genre: "FPS",
            mood: "Intense",
            imageUrl: "https://via.placeholder.com/300x400?text=Doom+Eternal"
        },
        {
            name: "Animal Crossing: New Horizons",
            genre: "Simulation",
            mood: "Relaxing",
            imageUrl: "https://via.placeholder.com/300x400?text=Animal+Crossing"
        },
        {
            name: "The Witcher 3: Wild Hunt",
            genre: "RPG",
            mood: "Story-focused",
            imageUrl: "https://via.placeholder.com/300x400?text=Witcher+3"
        },
        {
            name: "Minecraft",
            genre: "Sandbox",
            mood: "Creative",
            imageUrl: "https://via.placeholder.com/300x400?text=Minecraft"
        },
        {
            name: "Hollow Knight",
            genre: "Metroidvania",
            mood: "Challenging",
            imageUrl: "https://via.placeholder.com/300x400?text=Hollow+Knight"
        },
        {
            name: "Overwatch",
            genre: "FPS",
            mood: "Competitive",
            imageUrl: "https://via.placeholder.com/300x400?text=Overwatch"
        },
        {
            name: "Persona 5",
            genre: "JRPG",
            mood: "Story-focused",
            imageUrl: "https://via.placeholder.com/300x400?text=Persona+5"
        },
        {
            name: "Celeste",
            genre: "Platformer",
            mood: "Challenging",
            imageUrl: "https://via.placeholder.com/300x400?text=Celeste"
        },
        {
            name: "Civilization VI",
            genre: "Strategy",
            mood: "Thoughtful",
            imageUrl: "https://via.placeholder.com/300x400?text=Civilization+VI"
        },
        {
            name: "Dark Souls III",
            genre: "Action RPG",
            mood: "Challenging",
            imageUrl: "https://via.placeholder.com/300x400?text=Dark+Souls+III"
        },
        {
            name: "Portal 2",
            genre: "Puzzle",
            mood: "Thoughtful",
            imageUrl: "https://via.placeholder.com/300x400?text=Portal+2"
        },
        {
            name: "Mass Effect 2",
            genre: "RPG",
            mood: "Story-focused",
            imageUrl: "https://via.placeholder.com/300x400?text=Mass+Effect+2"
        },
        {
            name: "Super Mario Odyssey",
            genre: "Platformer",
            mood: "Fun",
            imageUrl: "https://via.placeholder.com/300x400?text=Super+Mario+Odyssey"
        },
        {
            name: "Hades",
            genre: "Roguelike",
            mood: "Fast-paced",
            imageUrl: "https://via.placeholder.com/300x400?text=Hades"
        },
        {
            name: "God of War",
            genre: "Action-Adventure",
            mood: "Epic",
            imageUrl: "https://via.placeholder.com/300x400?text=God+of+War"
        },
        {
            name: "Among Us",
            genre: "Social Deduction",
            mood: "Social",
            imageUrl: "https://via.placeholder.com/300x400?text=Among+Us"
        },
        {
            name: "Final Fantasy VII Remake",
            genre: "JRPG",
            mood: "Epic",
            imageUrl: "https://via.placeholder.com/300x400?text=FF7+Remake"
        },
        {
            name: "Fortnite",
            genre: "Battle Royale",
            mood: "Competitive",
            imageUrl: "https://via.placeholder.com/300x400?text=Fortnite"
        },
        {
            name: "Disco Elysium",
            genre: "RPG",
            mood: "Thoughtful",
            imageUrl: "https://via.placeholder.com/300x400?text=Disco+Elysium"
        },
        {
            name: "Assassin's Creed Valhalla",
            genre: "Action-Adventure",
            mood: "Exploration",
            imageUrl: "https://via.placeholder.com/300x400?text=AC+Valhalla"
        },
        {
            name: "Ghost of Tsushima",
            genre: "Action-Adventure",
            mood: "Story-focused",
            imageUrl: "https://via.placeholder.com/300x400?text=Ghost+of+Tsushima"
        },
        {
            name: "Death Stranding",
            genre: "Action",
            mood: "Unique",
            imageUrl: "https://via.placeholder.com/300x400?text=Death+Stranding"
        },
        {
            name: "Valorant",
            genre: "FPS",
            mood: "Competitive",
            imageUrl: "https://via.placeholder.com/300x400?text=Valorant"
        },
        {
            name: "Ori and the Will of the Wisps",
            genre: "Platformer",
            mood: "Atmospheric",
            imageUrl: "https://via.placeholder.com/300x400?text=Ori"
        },
        {
            name: "Cyberpunk 2077",
            genre: "RPG",
            mood: "Immersive",
            imageUrl: "https://via.placeholder.com/300x400?text=Cyberpunk+2077"
        },
        {
            name: "Fall Guys",
            genre: "Battle Royale",
            mood: "Fun",
            imageUrl: "https://via.placeholder.com/300x400?text=Fall+Guys"
        },
        {
            name: "Control",
            genre: "Action-Adventure",
            mood: "Atmospheric",
            imageUrl: "https://via.placeholder.com/300x400?text=Control"
        }
    ];
    
    gameLibrary = sampleGames;
    saveGameLibrary();
    updateFilterOptions();
    
    alert('Sample games have been loaded into your library!');
    
    // Update library display if it's currently shown
    if (!libraryDisplay.classList.contains('hidden')) {
        displayLibrary();
    }
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', init);