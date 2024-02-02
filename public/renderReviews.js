const currentPath = window.location.pathname;
const pathId = currentPath.substring(8);

if (!pathId == '') {
  document.querySelector('#reviews__prev').style.display = 'none';
  let page = 1;
  renderReview(await fetchReviews(currentPath, page));

  document.querySelector('#reviews__next').addEventListener('click', async () => {
    document.querySelector('#reviews__prev').style.display = 'block';
    page++
    let reviewArr = await fetchReviews(currentPath, page)

    if (reviewArr.length > 0) {
      const reviewsNode = document.querySelector('#reviews__list')
      while (reviewsNode.firstElementChild) {
        reviewsNode.removeChild(reviewsNode.lastElementChild)
      }
      renderReview(await fetchReviews(currentPath, page));
    } else {
      page--;
      document.querySelector('#reviews__next').style.display = 'none';
    }
  })

  document.querySelector('#reviews__prev').addEventListener('click', async () => {
    document.querySelector('#reviews__next').style.display = 'block';
    page--
      const reviewsNode = document.querySelector('#reviews__list')
      while (reviewsNode.firstElementChild) {
        reviewsNode.removeChild(reviewsNode.lastElementChild)
      }
      renderReview(await fetchReviews(currentPath, page));
    if (page == 1){
      document.querySelector('#reviews__prev').style.display = 'none';
    }
  })
}

async function fetchReviews(path, page) {
  const response = await fetch(`/api/${path}/reviews/${page}`);
  if (response.ok) {
    let payload = await response.json();
    return payload;
  } else {
    throw new Error(`Something went wrong with the request. Error code: ${response.status}`)
  }
}

async function renderReview(reviewsArr) {
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

