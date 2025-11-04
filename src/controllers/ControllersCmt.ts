
import { NextFunction, Response,Request } from "express";

const handleResponse = (res:Response,status:number,message:string,data?:any):Response =>{
    return res.status(status).json({
        status,
        message,
        data,    
    });
}

export const GetComments = async (req:Request,res:Response,next:NextFunction) => {
    try {
    
    handleResponse
    } catch (err) {
      next(err);
    }
};
  
export const CreateComment = async (req:Request,res:Response,next:NextFunction) => {
    try {

    handleResponse
    } catch (err) {
      next(err);
    }
};
  
export const UpdateCommentController = async (req:Request,res:Response,next:NextFunction)=> {
    try {

    handleResponse
    } catch (err) {
      next(err);
    }
};
  
export const DeleteComment = async (req:Request,res:Response,next:NextFunction) => {
    try {

        handleResponse
    } catch (err) {
      next(err);
    }
};
  