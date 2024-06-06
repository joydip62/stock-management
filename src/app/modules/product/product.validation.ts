import Joi from "joi";
import { TProduct, TVariant, TInventory } from "./product.interface";

// Define the validation schema for a variant
const variantValidationSchema = Joi.object<TVariant>({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

// Define the validation schema for inventory
const inventoryValidationSchema = Joi.object<TInventory>({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

// Define the validation schema for a product
const productValidationSchema = Joi.object<TProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantValidationSchema).required(),
  inventory: inventoryValidationSchema.required(),
});

export default productValidationSchema;
