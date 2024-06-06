import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";



const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({_id});
  return result;
};

const updateProductIntoDB = async (productId: string, updatedData: TProduct) => { 
  const result = await ProductModel.findByIdAndUpdate(productId, updatedData);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
};
