import { Request,Response,NextFunction } from "express";

interface CoustomError extends Error {
    status?: number;
}

export const errorhandlermiddleware=(err:any,req:Request,res:Response,next:NextFunction)=>{
    const status = err.status || 500;
    const message=err.message || "Internal server error !!!";
    return res.set(status).json({
        success:false,
        status,
        message
    })
}

export const errorhandler=(statuscode:number,message:string)=>{
    const error=new Error() as CoustomError;
    error.status=statuscode;
    error.message= message;
    return error;
}