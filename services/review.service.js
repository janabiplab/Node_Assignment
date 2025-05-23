import reviewModel from "../models/review.model.js"
import bookModel from "../models/book.model.js"
import Review from "../models/review.model.js"

//create review

export const createReview=async(userId,bookId,reviewData)=>{
    const review=new Review({...reviewData,user:userId,book:bookId})
    return await review.save()
}

export const bookDetails=async(bookId,page=1,limit=5)=>{

    const book=await bookModel.findById(bookId)
    if (!book) throw new Error("Book not found");

    const filter = { book: bookId };
    const reviews = await reviewModel.find(filter)
       .populate('user')
       .skip((page - 1) * limit)
       .limit(limit);

    const count = await reviewModel.countDocuments(filter);
    const avgRating = await reviewModel.aggregate([
        { $match: { book: book._id } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);  
    
    return {
       book,
       averageRating: avgRating[0]?.avgRating || 0,
       reviews,
       totalReviews: count,
  };
}

//update reviewId

export const updateReview=async(reviewId,userId,updatedData)=>{

    const review=await reviewModel.findOneAndUpdate(
        {_id:reviewId,user:userId},
        updatedData,
        {new:true}
    )
    if (!review) {
        throw new Error("Review not found or unauthorized User");
    }
    return review;
}


export const deleteReview=async(reviewId,userId)=>{

    const reviewData=await reviewModel.findOneAndDelete({_id:reviewId,user:userId})

    if(!reviewData){
        throw new Error("Review not found or unauthorized User");
    }
     
    return reviewData

}
