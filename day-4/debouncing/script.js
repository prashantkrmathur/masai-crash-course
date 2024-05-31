const API_KEY = 'db201d28'; 

const searchBox = document.getElementById('searchBox');
const resultsContainer = document.getElementById('results');
const movieDetailsContainer = document.getElementById('movieDetails');

let timeoutId;

searchBox.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        fetchMovies(searchBox.value);
    }, 500); // Debouncing delay of 500ms
});

async function fetchMovies(query) {
    if (!query) {
        resultsContainer.innerHTML = '';
        return;
    }
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    displayResults(data.Search);
}

function displayResults(movies) {
    resultsContainer.innerHTML = '';
    if (!movies) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <span>${movie.Title} (${movie.Year})</span>
        `;
        movieElement.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
        resultsContainer.appendChild(movieElement);
    });
}

async function fetchMovieDetails(imdbID) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
    const data = await response.json();
    displayMovieDetails(data);
}

function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Cast:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
}
