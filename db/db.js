import mongoose from "mongoose"

function dbConnect(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Connected MongoDB')
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default dbConnect