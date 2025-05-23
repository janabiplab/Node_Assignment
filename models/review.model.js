import mongoose from "mongoose"

const reviewSchema=new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    book:{ type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    rating:{type:Number,min:1,max:5},
    comment:{type:String},

}, { timestamps: true })

reviewSchema.index({ user: 1, book: 1 }, { unique: true })

const Review=mongoose.model('review',reviewSchema)

export default Review