import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProductController {
  public async fetchProductsBytypes( req: Request, res: Response,) {
    try {
      const { productType } = req.body;

      const products = await prisma.products.findMany({
        where: {
          ProductTypeId: productType,
          isDeleted: false,
        },
        orderBy: {
          name: "asc",
        },
      });
      const updated_products = products.map((item,index)=>{
        const urls = item.imageUrl.split(";")
        const imageName = item.imageName.split(";")
        return(
          {
            ...item,
            imageName:imageName,
            imageUrl:urls
          }
        )
      }
      )
      if(updated_products){
        res
        .status(200)
        .json({data:updated_products})
      }else{
        res
        .status(404)
        .json({data:"Data Not Found"})
      }
      return
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .json({error:error})
    }
  }

  public async fetchProductsById(req:Request, res:Response){
    try {
      const  {Id}  = req.query;
      if(!Id){
        res.status(400)
        .json({error:"please pass proper query params"})
        return
      }
      const productId = Number(Id);

      const fetchProduct = await prisma.products.findFirst({
        where:{
          ProductId:productId,
          isDeleted:false
        }
      });
      if(!fetchProduct){
        res.status(404)
        .json({message:"Product Not Found"});
        return
      }else{
        res.status(200)
        .json({message:fetchProduct})
        return
      }

    } catch (error) {
      res.status(500)
      .json({error:error})
      return
    }
  }
}

export default ProductController;
