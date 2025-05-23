import jsonwebtoken from "jsonwebtoken"

export const authUser=(req,res,next)=>{
    const authHeader=req.headers.authorization

    //checking for header exist and is Bearer token

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message:"Unauthorized User"})
    }
    const token=authHeader.split(' ')[1]

    try{
        const decoded=jsonwebtoken.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch(error){
       console.log("JWT Error:",error.message)
       res.status(401).send({error:"Unauthorized User User"})
    }
}






