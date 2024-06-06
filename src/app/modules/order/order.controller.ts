import { Request, Response } from "express";
import { ProductModel } from "../product/product.model";
import { OrderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { error, value } = orderValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const result = await OrderService.createOrdersIntoDB(value);

    //   check product exists in database
    const product = await ProductModel.findById(result.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //   check user quantity exists
    if (product.inventory.quantity < result.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    product.inventory.quantity -= result.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Occurred While Creating New Order",
      error,
    });
  }
};

const getOrder = async (req: Request, res: Response) => { 
    try {
      const result = await OrderService.getAllOrdersFromDB();
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error Occurred While Fetching Orders",
        error,
      });
    }
}

export const OrderControllers = {
  createOrder,
  getOrder,
};
