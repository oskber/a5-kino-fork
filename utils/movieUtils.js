export async function getMovieById(id) {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    const json = await response.json();
    return json;
}

export async function getMovies() {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/`);
    const json = await response.json();
    return json;
}