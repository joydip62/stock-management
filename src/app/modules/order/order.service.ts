import { TOrders } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrdersIntoDB = async (orders: TOrders) => {
  const result = await OrderModel.create(orders);
  return result;
};


export const OrderService = {
  createOrdersIntoDB,
};
