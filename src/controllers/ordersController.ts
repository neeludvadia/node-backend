import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
class orderController {
  // prisma = new PrismaClient();

  public async saveOrders(req: Request, res: Response): Promise<void> {
    const {orderNumber,
      stripeCheckoutSessionId,
      stripePaymentIntentId,
      stripeCustomerId,
      clerkUserId,
      customerName,
      email,
      invoice,
      currency,
          amountDiscount,
          totalPrice,
          status,
          products,

    } = await req.body;
    console.log(req.body,"this is body")
    try {
      const insertInvoiceDetais = await prisma.invoice.create({
        data: {
          invoiceId: invoice?.id,
          number: invoice?.number,
          hostedInvoiceUrl: invoice?.hosted_invoice_url,
        },
      });

      if(!insertInvoiceDetais){
        console.error("error while inserting invoice");
        res.status(400)
        .json({
          error:`error while inserting invoice`
        }); 
        return;
      }

      const insertOrder = await prisma.order.create({
        data:{
          orderNumber,
          stripeCheckoutSessionId,
          stripePaymentIntentId,
          stripeCustomerId,
          clerkUserId,
          customerName,
          email,
          invoiceId:insertInvoiceDetais?.invoiceId ?? null,
          currency,
          amountDiscount,
          totalPrice,
          status,
          products:{
            create:products.map((item:any)=>({
              productId: item?.productId,
              name:item?.name,
              price:item?.price,
              quantity:item?.quantity
            }))
          }
        }
      })

      if(!insertOrder){
        console.log(`error while creating order`);
        res.status(400)
        .json({
          error:`error while inserting order`
        })
        return;
      }

      res.status(200)
      .json({
        message:"order inserted successfully"
      })
      return;

    } catch (error) {
      console.error(`error while inserting orders:${error}`);
      res.json({
        error:`error while inserting orders${error}`
      });
      return
    }
  }

  public async getOrders(req: Request, res: Response):Promise<void>{
    const userId= req.query.userId?.toLocaleString();

    if(!userId){
      res.status(400)
      .json({error:`please send proper userId`});
      return
    }

    try {
      const order = await prisma.order.findMany({
        include:{
          products:{
            include:{
              product:true
            }
          },
          invoice:true,
        },
        where:{
          clerkUserId:userId,
        },
        orderBy:{
          createdAt:"desc",
        },
      })
      const updatedOrders = order.map((order) => ({
        ...order,
        products: order.products.map((product) => ({
          ...product,
          product: {
            ...product.product,
            imageUrl: typeof product.product.imageUrl === "string"
              ? product.product.imageUrl.split(";").filter(Boolean)
              : [],
          },
        })),
      }));
      

      if(order){
        res.status(200)
        .json({
          data:updatedOrders
        })
        return
      }

    } catch (error) {
      console.error(error);
    }
  }
}

export default orderController;
