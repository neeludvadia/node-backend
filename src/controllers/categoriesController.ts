import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CategoriesController {
   public async getCategories(req:Request,res:Response):Promise<void>{
    try {
        const data = await prisma.category.findMany();
        if(data){

            res.status(200)
            .json({data:data});
        }else{
            res.status(404)
            .json({message:"No Data Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500)
        .json({message:error});
    }
   }
}

export default CategoriesController
