import { API_BASE } from "../routes/api.js";
import fetch from "node-fetch";

/*Fetches all reviews for each movie from CMS then filters the data to remove
all unverified or invalid reviews. Then the function paginates the array and sets 
the pagesize to 5*/
export async function getReviewsSizeFive(id, page) {
  const res = await fetch(`${API_BASE}/reviews?filters[movie]=${id}`)
  const payload = await res.json();

  const modifiedArr = payload.data.map((obj) => ({
    id: obj.id,
    ...obj.attributes
  }))

  let filteredArr = modifiedArr.filter((obj) => {

    return obj.verified && (obj.comment || obj.rating);

  })

  filteredArr.forEach(function (obj) {
    obj.author === null ? obj.author = 'Okänd användare' : obj.author = obj.author;
    obj.author === '' ? obj.author = 'Okänd användare' : obj.author = obj.author;

    obj.comment === null ? obj.comment = '' : obj.comment = obj.comment;

    obj.rating === null ? obj.rating = '' : obj.rating = `Betyg: ${obj.rating}`;
  });

  const itemsPerPage = 5;
  const currentPage = page;
  let paginatedArr = []

  for (let i = 0; i < filteredArr.length; i++) {
    if (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) {
      paginatedArr.push(filteredArr[i]);
    }
  }
  return paginatedArr;
}

//skriv här



