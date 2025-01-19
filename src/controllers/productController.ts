import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProductController {
  public async fetchProductsWithtypes( req: Request, res: Response,) {
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
}

export default ProductController;
