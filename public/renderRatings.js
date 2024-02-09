
// Funktion för att hämta filmer från API:et och anropa renderRating för att visa dem
async function fetchMovies(id) {
  const response = await fetch(`/api/movies/${id}/ratings`);
  if (response.ok) {
    const ratings = await response.json();
    return ratings;
  } else {
    console.error('Failed to fetch rating');
  }
}

async function renderRating(){
  const movie = document.querySelectorAll('.movie');
  for(const el of movie){
    const rating = await fetchMovies(el.id);
    el.querySelector('.rating').textContent = `${rating.rating} / ${rating.maxRating}`
  }
}

renderRating()
