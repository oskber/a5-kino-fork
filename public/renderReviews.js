
if(window.location.pathname.includes('/movies/')){
  console.log('Moviepage!')
  const currentPath = window.location.pathname;
  let page = 1;
  renderReview( await fetchReviews(currentPath, page));
  document.querySelector('#reviews__btn').addEventListener('click', async () => {
    page++ 
    let reviewArr = await fetchReviews(currentPath, page)
    if( reviewArr.length > 0){
    const reviewsNode = document.querySelector('#reviews__list')
    while (reviewsNode.firstElementChild) {
      reviewsNode.removeChild(reviewsNode.lastElementChild)
    }
    renderReview(await fetchReviews(currentPath, page));
  }

  })
}

async function fetchReviews(path, page){
  const response = await fetch(`/api/${path}/reviews/${page}`);
  if(response.ok) {
    let payload = await response.json();
      return payload;
  } else {
      throw new Error(`Something went wrong with the request. Error code: ${response.status}`)
  }

}

async function renderReview(reviewsArr){
  console.log(reviewsArr)
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

