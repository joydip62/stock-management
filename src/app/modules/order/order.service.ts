import { TOrders } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrdersIntoDB = async (orders: TOrders) => {
  const result = await OrderModel.create(orders);
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  if (email) {
    return await OrderModel.find({ email });
  } else {
    return await OrderModel.find();
  }
};

export const OrderService = {
  createOrdersIntoDB,
  getAllOrdersFromDB,
};
