const global = {
    currentPage: window.location.pathname
};

// Fetch popular movies
async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    
    results.forEach(movie => {
        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = 
        `
            <a href="movie-details.html?id=${movie.id}">
              ${movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />` 
                : 
                `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="Movie Title"
                />
                `
              }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date} </small>
                </p>
            </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    })
}

// Fetch popular TV shows

async function displayPopularTV (){
    const { results } = await fetchAPIData('tv/popular');

    results.forEach(show => {
        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = 
        `
            <a href="movie-details.html?id=${show.id}">
              ${show.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                />` 
                : 
                `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="Movie Title"
                />
                `
              }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${show.first_air_date} </small>
                </p>
            </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    })
}

// Fetch data from TMBD API
async function fetchAPIData(endpoint) {
    const API_KEY = '3e995e427fd2be80a3d1fd71b5d911e3';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();

    hideSpinner();
    return data;
}

// Show Spinner
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
    
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link 
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}



// Init App 
function init() {
    switch(global.currentPage) {
    case '/':
    case '/index.html':
        displayPopularMovies();
        break;
    case '/shows.html':
        displayPopularTV();
        break;
    case '/movie-details.html':
        console.log('Movie Details');
        break;
    case '/tv-details.html':
        console.log('TV Details');
        break;
    case '/search.html':
        console.log('Search');
        break;
    }

    highlightActiveLink();
}


// why would use DOMContentLoaded? 
document.addEventListener('DOMContentLoaded', init);