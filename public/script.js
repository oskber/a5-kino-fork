const submitBtn = document.querySelector('.review-submit');

async function handleReviewForm(event) {
  event.preventDefault();

  const form = document.querySelector('.review-form');
  const commentInput = document.querySelector('.review-comment');
  const authorInput = document.querySelector('.review-author');
  const ratingInput = document.querySelector('input[name="rating"]:checked');
  const selectedRating = parseInt(ratingInput.value, 10);
  const url = new URL(window.location.href);
  const movieId = url.pathname.replace('/movies/', '');

  const review = {
    "data": {
      comment: commentInput.value,
      rating: selectedRating,
      author: authorInput.value,
      verified: true,
      movie: movieId,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      createdBy: authorInput.value,
      updatedBy: authorInput.value,
    }
  };
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  form.reset();
}

function getCurrentDate() {
  const date = new Date();
  return date.toISOString();
}

submitBtn.addEventListener('click', (e) => {
  handleReviewForm(e);
});
