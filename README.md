## Project Details
This is a Node.js + Express RESTful API for a book review platform. Authenticated users can add books, write one review per book, update or delete their own reviews, and search books by title or author.
---

## API
### User SignUp
<pre>
curl -X POST http://localhost:3000/users/signup\
  -H "Content-Type: application/json" \
  -d '{"email":"biplab@example.com","password":"123456"}
</pre>  


### User Login
<pre>
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json"\ 
  -d '{"email":"biplab@example.com","password":"123456"}
</pre>  

### Add a Book (For Authenticated User Only)
<pre>
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"\
  -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","punblished":Year}
</pre>  

### Search a Book
<pre>
curl http://localhost:3000/books/search?query=author_name/title_name
</pre>  

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
<pre>
curl http://localhost:3000/books/<book_id>
</pre>  


---


## Schema

### User Schema
<pre>
  import mongoose from "mongoose"

import bcrypt from  "bcrypt"

import jsonwebtoken from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:6,
        maxLength:50
    },

    password:{
        type:String,
        select:false

    }
})

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

userSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateJWT=function(){
    return jsonwebtoken.sign(
        {email:this.email},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
}


const User=mongoose.model('user',userSchema)
export default User
</pre>

---

### Book Schema

<pre>
  const BookSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    published:{type:Number}
})

</pre>

### Review Schema
<pre>
  const reviewSchema=new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    book:{ type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    rating:{type:Number,min:1,max:5},
    comment:{type:String},

}, { timestamps: true })
</pre>



  
  





