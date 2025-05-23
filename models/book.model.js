import mongoose from "mongoose"

const BookSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    published:{type:Number}
})


const Book=mongoose.model('book',BookSchema)

export default Book