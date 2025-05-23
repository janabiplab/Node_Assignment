import bookModel from "../models/book.model.js"

export const createBook=async(bookData)=>{
    const book=new bookModel(bookData)
    return await book.save()
}

export const getBook=async({page=1,limit=10,author,genre})=>{
    const filter_book={}
    if(author){
        filter_book.author=author
       
    }
    if(genre){
         filter_book.genre=genre
    }

    const books = await bookModel.find(filter_book)
       .skip((page - 1) * limit)
       .limit(parseInt(limit));

    const count = await bookModel.countDocuments(filter_book);

    return { books, total: count };
}

export const searchBooks=async(query)=>{
    const regex = new RegExp(query, 'i');
    return await bookModel.find({
    $or: [
      { title: { $regex: regex } },
      { author: { $regex: regex } },
    ]
  });
}