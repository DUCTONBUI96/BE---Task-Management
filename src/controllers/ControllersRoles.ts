import { NextFunction, Response,Request } from "express";
import { CreateRole, getRolebyId,DeleteRole, getAllRole } from "../model/Roles";
const handleResponse = (res:Response,status:number,message:string,data?:any):Response =>{
    return res.status(status).json({
        status,
        message,
        data,    
    });
}

export const GetAllRoles = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const all = await getAllRole();
        handleResponse(res,201,"successfull",all);
    }
    catch(err){
        next(err);
    }
}

export const GetRole = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = Number(req.params['id'])
        const Role = await getRolebyId(Id);
        handleResponse(res,201,"successfull",Role);
    }
    catch(err){
        next(err);
    }
}

export const CreateNewRole = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const  {name ,Description }= req.body;
        const New = await CreateRole(name,Description);
        handleResponse(res,201,"Created",New)
    }
    catch (err){
        next(err);
    }
}

export const DeleteRoleById = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const Id = Number(req.params['id']); 
        const Delete = await DeleteRole(Id);
        handleResponse(res,201,"Deleted",Delete)
    }
    catch(err){
        next(err);
    }
}