import * as reviewService from "../services/review.service.js"

import {validationResult} from "express-validator"

//for post a review

export const submitReview=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
           const { id: bookId } = req.params;
           const userId=req.user._id
           const review=await reviewService.createReview(userId,bookId,req.body)
           res.status(201).json(review)
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}

//for create book details by id with pagination

export const getBookDetails=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const {id}=req.params
        const { page = 1, limit = 5 } = req.query;
        const book_details_data = await reviewService.bookDetails(id, parseInt(page), parseInt(limit));
        res.status(201).json(book_details_data);
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


//for updated review

export const getUpdatedReview=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{

        const {id:reviewId}=req.params
        const userId=req.user._id
        const updated_review_data=await reviewService.updateReview(reviewId,userId,req.body)
        res.status(200).json(updated_review_data)
    }
    catch(err){
        res.status(403).json({error:err.message})
    }


}


export const getDeletedReview=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
      const {id:reviewId}=req.params
      const userId=req.user._id
      await reviewService.deleteReview(reviewId,userId)
      res.status(200).json({message:"review deleted sucessfully"})
    }catch(err){
        res.status(403).json({error:err.message})
    }
}

