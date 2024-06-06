import { Request, Response } from "express";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";

// create product controllers
const createProduct = async (req: Request, res: Response) => {
  try {
    const productsData = req.body;

    // Validate the request data
    const { error, value } = productValidationSchema.validate(productsData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details,
      });
    }
    const result = await ProductService.createProductIntoDB(value);

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

// get all product controllers
const getProduct = async (req: Request, res: Response) => {
  try {
     const searchQuery = (req.query.searchTerm as string) || "";
     let result;

     if (searchQuery) {
       result = await ProductService.getAllProductFromDB(searchQuery);
     } else {
       result = await ProductService.getAllProductFromDB();
     }

     if (!result || result.length === 0) {
       return res.status(404).json({
         success: false,
         message: "Product Not Found",
       });
     }

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

// get single product controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

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

// update product controllers
const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.updateProductIntoDB(
      req.params.productID,
      req.body
    );
    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
};

// delete product controller  
const deleteProduct = async (req: Request, res: Response) => { 
  try {
    const result = await ProductService.deleteProductIntoDB(
      req.params.productID
    );

    res.json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
}

export const productControllers = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
