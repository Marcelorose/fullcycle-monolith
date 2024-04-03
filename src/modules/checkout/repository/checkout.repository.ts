import Order from '../domain/order.entity';
import CheckoutGateway from '../gateway/checkout.gateway';
import OrderModel from './order.model';

export default class CheckoutRepository implements CheckoutGateway {
  findOrder(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  async addOrder(order: Order): Promise<void> {
    const orderModel = new OrderModel({
      id: order.id.id,
      clientId: order.client.id,
      status: order.status,
    });

    await orderModel.save();
  }
}
