import express from "express";
import  { usermodel } from "../schema/db";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../db/user";

const userroute=express.Router();
export default userroute;





userroute.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const password= await bcrypt.hash(req.body.password,5);


    try{
         
         await usermodel.create({
            username,password
         })

         res.status(200).json({message:"user sucessfully signed up "})
       }
       catch(err)
       {
        res.status(200).json({message:"this username already exists"})
       }
})

userroute.post("/signin",async (req ,res)=>{
   const username:string =req.body.username;
   const password:string =req.body.password;
   
   const user =await usermodel.findOne({
      username
   })
   //console.log(user?.password);
   //console.log(password);
   if(!user)
   {
     res.status(400).json({message:"please signin"})
   }
   else
   {     const valid= await bcrypt.compare(password,user.password);
   if (!valid)
      {
         res.status(401).json({message:"invalid credentials"})
      }
     else
      {
         const token=jwt.sign({username: user.username},process.env.JWT_SECRET!);
         
         res.status(200).json({message:"you succesfully signin", auth:token});
      //   localStorage.setItem("token",token);
         
         
      }
   }

    
})

userroute.get("/init",async (req,res,next)=>{
   const token=req.headers.authorization;
   if(!token)
   {
      res.status(200).json({message:"please signin"})
   }
   else
   {
      const decoded=jwt.verify(token,process.env.JWT_SECRET!) as {password:string};
      (req as any).auth=token;
      next();
   }
});