import { model, Schema } from "mongoose";
import { TOrders } from "./order.interface";

const OrderSchema = new Schema<TOrders>({
  email: {
    type: String,
  },
  productId: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

export const OrderModel = model<TOrders>("Order", OrderSchema);