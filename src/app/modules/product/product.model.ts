import { model, Schema } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>(
  {
    type: { type: String},
    value: { type: String},
  },
  { _id: false }
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number},
    inStock: { type: Boolean},
  },
  { _id: false }
);

const productSchema = new Schema<TProduct>({
  name: { type: String},
  description: { type: String},
  price: { type: Number},
  category: { type: String},
  tags: { type: [String]},
  variants: { type: [variantSchema]},
  inventory: { type: inventorySchema},
});

export const ProductModel = model<TProduct>("Product", productSchema);