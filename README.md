# A5-Kino-Grupparbete

## API Documentation

---

###/api/movies/{id}/ratings
GET - Get avg rating of movie with id {id}

###/api/coming-screenings
GET - Get up to 10 upcoming screenings in the next five days

###/screenings/screenings-details-page/movies/:id
GET - Get screenings for movie with id {id}

###/api/movies/{id}/reviews
GET - Get page query ?page={page} reviews for movie with id {id} (5 per page)
POST - Post review

{
    "data": {
        "comment": "string",
        "rating": "number",
        "author": "string",
        "verified": "bool",
        "movie": "number",
        "createdAt": "date",
        "updatedAt": "date,
        "createdBy": "string",
        "updatedBy": "string"
    }
}

---