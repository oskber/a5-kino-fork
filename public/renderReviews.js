const currentPath = window.location.pathname;
let page = 1;
const nextBtn = document.querySelector('#reviews__next');
const prevBtn = document.querySelector('#reviews__prev');
prevBtn.style.display = 'none';

renderReview(await fetchReviews(currentPath, page));

/*Listener for next btn */
nextBtn.addEventListener('click', nextPage)

/*Listener for previous btn */
prevBtn.addEventListener('click', prevPage)

/*Function for going to next page of reviews */
async function nextPage() {
  disableBtn(nextBtn)
  prevBtn.style.display = 'block';
  page++;
  const reviewsNode = document.querySelector('#reviews__list')
  while (reviewsNode.firstElementChild) {
    reviewsNode.removeChild(reviewsNode.lastElementChild)
  }
  renderReview(await fetchReviews(currentPath, page));
}
/*Function for going to previous page of reviews */
async function prevPage() {
  disableBtn(prevBtn);
  page--;
  const reviewsNode = document.querySelector('#reviews__list')
  while (reviewsNode.firstElementChild) {
    reviewsNode.removeChild(reviewsNode.lastElementChild)
  }
  renderReview(await fetchReviews(currentPath, page));
  if (page == 1) {
    document.querySelector('#reviews__prev').style.display = 'none';
    return
  } else {
    prevBtn.style.display = 'block';
  }
}
/*Function for fetching reviews from API */
async function fetchReviews(path, page) {
  const response = await fetch(`/api/${path}/reviews/${page}`);
  if (response.ok) {
    let payload = await response.json();
    return payload;
  } else {
    throw new Error(`Something went wrong with the request. Error code: ${response.status}`)
  }
}
/*Function for rendering html template for each object of fetched array. 
It also checks if the next fetched array is empty or not. If it is, it hides the nextBtn*/
async function renderReview(reviewsArr) {
  const nextPageNum = page + 1;
  const nextArr = await fetchReviews(currentPath, nextPageNum);
  if (reviewsArr.length < 1) {
    nextBtn.style.display = 'none';
    const noReviews = document.createElement('h2');
    noReviews.innerText = 'Det finns inga recensioner än!'
    noReviews.classList.add('text-primary', 'text-2xl', 'py-3', 'font-bold')
    document.querySelector('#reviews__list').appendChild(noReviews)
    return
  }
  if (nextArr.length < 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
  }
  reviewsArr.forEach(obj => {
    const reviewTemplate = document.querySelector('#reviewTemplate');
    const temp = reviewTemplate.content.cloneNode(true);
    const reviewItem = temp.querySelector('#review__item');
    const reviewText = temp.querySelector('#review__text')
    const reviewName = temp.querySelector('#review__name');
    const reviewrating = temp.querySelector('#review__rating')
    reviewItem.id = obj.id;
    reviewText.textContent = obj.comment;
    reviewName.textContent = obj.author;
    reviewrating.textContent = obj.rating;
    document.querySelector('#reviews__list').appendChild(temp);
  });
}

function disableBtn(btn) {
  btn.disabled = true;
  setTimeout(() => {
    btn.disabled = false;
  }, 250);
}