const submitBtn = document.querySelector(".review-submit");

async function handleReviewForm(event) {
  event.preventDefault();

  const form = document.querySelector(".review-form");
  const commentInput = document.querySelector(".review-comment");
  const authorInput = document.querySelector(".review-author");
  const ratingInput = document.querySelector(".review-rating");
  const title = document.querySelector(".movie-title");

  const review = {
    "data": {
      "comment": commentInput.value,
      "rating": ratingInput.value,
      "author": authorInput.value,
      "verified": true,
      "movie": title.textContent.trim(),
      "createdAt": getCurrentDate(),
      "updatedAt": getCurrentDate(),
      "createdBy": authorInput.value,
      "updatedBy": authorInput.value
    }
  }
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  })
}

function getCurrentDate() {
    const date = new Date();
    return date.toISOString();
}

submitBtn.addEventListener("click", (e) => {
    handleReviewForm(e);
});