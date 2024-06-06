import Joi from "joi";
import { TOrders } from "./order.interface";

export const orderValidationSchema = Joi.object<TOrders>({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(1),
});
