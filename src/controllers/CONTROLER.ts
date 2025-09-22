import { getUsers,CreateUser,deleteUser } from "../model/model";
import { NextFunction, Response,Request } from "express";

const handleResponse = (res:Response,status:number,message:string,data?:any):Response =>{
    return res.status(status).json({
        status,
        message,
        data,    
    });
}

export const GetAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const allUsers = await getUsers();
        handleResponse(res,201,"successfull",allUsers);
    }
    catch(err){
        next(err);
    }
}

export const CreateNewUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const  {name , email , passwordhash}= req.body;
        const newUser = await CreateUser(name,email,passwordhash);
        handleResponse(res,201,"successfull",newUser)
    }
    catch (err){
        next(err);
    }
}

export const DeleteUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Id = Number(req.params['id']); 
        const Userdelete = await deleteUser(Id);
        handleResponse(res,201,"successfull",Userdelete)
    }
    catch(err){
        next(err);
    }
}