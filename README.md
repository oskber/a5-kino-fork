# A5-Kino-Grupparbete

## API Documentation
https://docs.google.com/document/d/1G01QkiOEw2QxH7raYkyTHQrN9TJmtYqZjkkRgI1uyS4/edit
---

### /api/coming-screenings
GET - Get up to 10 upcoming screenings in the next five days

### /api/movies/{id}/ratings
GET - Get avg rating of movie with id {id}

### /api/movies/{id}/screenings
GET - Get upcoming screenings for movie with id {id}

### /api/movies/{id}/reviews
GET - Get page query ?page={page} reviews for movie with id {id} (5 per page)
<br>
POST - Post review

```
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
```

---