## Project Details
This is a Node.js + Express RESTful API for a book review platform. Authenticated users can add books, write one review per book, update or delete their own reviews, and search books by title or author.
---

## API
### User SignUp
<pre>
curl -X POST http://localhost:3000/users/signup
  -H "Content-Type: application/json" 
  -d '{"email":"biplab@example.com","password":"123456"}
</pre>  


### User Login
<pre>
curl -X POST http://localhost:3000/users/login 
  -H "Content-Type: application/json" 
  -d '{"email":"biplab@example.com","password":"123456"}
</pre>  

### Add a Book (For Authenticated User Only)
<pre>
curl -X POST http://localhost:3000/books 
  -H "Authorization: Bearer <token>" 
  -H "Content-Type: application/json"
  -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","punblished":Year}
</pre>  

### Search a Book
curl http://localhost:3000/books/search?query=author/title

### Submit a Review (Authenticated User)
<pre>
curl -X POST http://localhost:3000/books/<book_id>/reviews 
  -H "Authorization: Bearer <token>" 
  -H "Content-Type: application/json" 
  -d '{"rating": 5, "comment": "Excellent book!"}
</pre>  

### Update Review (Authenticated User Only)
<pre>
curl -X PUT http://localhost:3000/books/reviews/<review_id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comment": "Updated comment"}
</pre>

### Delete  Review (Authenticated User Only)
<pre>
  curl -X DELETE http://localhost:3000/books/reviews/<review_id> \
  -H "Authorization: Bearer <token>"

</pre>

### Get Book Details by ID (Public)
curl http://localhost:3000/books/<book_id>

  
  





