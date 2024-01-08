import { Request,Response,NextFunction } from "express";

export const error=(err:any,req:Request,res:Response,next:NextFunction)=>{
    if(err)
    {
        let status= err.statusCode||500;
        let message= err.message|| "Internal server error"
        res.status(status).json({status:status,errmsg:message});
    }
    else
    {
        next();
    }
}