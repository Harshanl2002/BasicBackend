import { Request,Response } from "express"
import usermodel from "../Models/User.model";
import bcrypt from "bcrypt";

export const signup=async (req:Request,res:Response)=>{
    console.log(req.body);
    const {name,email,password}= req.body;
    let user=new usermodel({name,email,password});
    if(await usermodel.find({ email: user.email }))
    {
        res.status(409).send("User email already found !!!");
        return;
    }
    try {
         await  bcrypt.hash(user.password,12).then((hash)=>{
            user.password=hash;
            try{
                user.save().then(()=>{
                    console.log(req.body);
                })
                res.status(201).send("User created sucessfully!!!")
            }
            catch
            {
                res.status(303).send("User email already found !!!")
            }
            
         });
        
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}
