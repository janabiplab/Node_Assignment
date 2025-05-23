import * as bookService from "../services/book.service.js"
import {validationResult} from "express-validator"

export const addBook=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
       
        const book=await bookService.createBook(req.body)
        res.status(201).json(book)
        
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

export const getAllBook=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const { books, total } = await bookService.getBook(req.query);
        res.json({ books, total });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getAllBookBySearch=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const results = await bookService.searchBooks(query);
        res.status(200).json(results);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}