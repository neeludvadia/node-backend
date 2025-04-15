import { query, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CategoriesController {
   public async getAllCategories(req:Request,res:Response):Promise<void>{
    try {
        const data = await prisma.category.findMany({
            orderBy: {
            CategoryId:"asc"
            }
        });
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

   public async getProductByCategory(req:Request,res:Response):Promise<void>{
    try {
        const {Id} = req.query
        const data = await prisma.products.findMany({
            where: {
              category: {
                title: Id as string,
              },
            },
          });

          const updatedData = data?.map((item,index)=>{
            const urls = item.imageUrl.split(";")
            const imageName = item.imageName.split(";")
            return(
            {
                ...item,
                imageName:imageName,
                imageUrl:urls
            }
            )
          })
          
        if(updatedData){
            res.status(200)
            .json({data:updatedData});
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
