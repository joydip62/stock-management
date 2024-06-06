import { Request, Response } from "express";
import { TProduct } from "./product.interface";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";


const createProduct = async (req: Request, res: Response) => {
  try {

    const productsData = req.body;

    // Validate the request data
    const { error } = productValidationSchema.validate(productsData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details,
      });
    }
    const result = await ProductService.createProductIntoDB(productsData);

    res.status(201).json({
      success: true,
      message: "Products created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      date: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const {productId} = req.params;

    const result = await ProductService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      date: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};



export const productControllers = {
  createProduct,
  getProduct,
  getSingleProduct,
};
