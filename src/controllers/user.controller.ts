import { Request,Response,NextFunction } from "express"
import usermodel from "../Models/User.model";
import bcrypt from "bcrypt";
import { errorhandler } from "../middleware/errorhandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Document } from "mongoose";
dotenv.config();

interface Iuser extends Document
{
    _doc?:any;
}

export const signup=async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body);
    const {name,email,password}= req.body;
    let user=new usermodel({name,email,password});
    try {
         await  bcrypt.hash(user.password,12).then(async (hash)=>{
            user.password=hash;
            try{
                await user.save().then(()=>{
                    console.log(req.body);
                })
                res.status(201).send("User created sucessfully!!!")
            }
            catch(error:any)
            {
                next(errorhandler(409,"user already exists plz use another email"));
            }
            
         });
        
    } catch (error:any) {
        next(error);
    }
}

export const login=async(req:Request,res:Response,next:NextFunction)=>{
    const {email, password}= req.body;
    try {
        const validuser=await usermodel.findOne({ email:email });
        if(!validuser) return next(errorhandler(404,"user not found"));
        const passwordcheck= bcrypt.compareSync(password, validuser.password);
        if(!passwordcheck) return next(errorhandler(403,"Wrong credentials"));
        const secret:string=process.env.JWT_SEC;
        const {password:hashedpassword, ...rest}=validuser._doc;
        res.cookie('auth-token',jwt.sign({ id: validuser._id },secret ),{httpOnly:true}).json(rest);
    } catch (error:any) {
        next(error);
    }
    
}

