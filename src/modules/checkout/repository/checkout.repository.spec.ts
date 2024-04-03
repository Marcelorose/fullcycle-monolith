import { Sequelize } from 'sequelize-typescript';

import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import Order from '../domain/order.entity';
import Product from '../domain/product.entity';
import CheckoutRepository from './checkout.repository';
import ClientModel from './client.model';
import OrderModel from './order.model';
import ProductModel from './product.model';

describe("CheckoutRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, ClientModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should place an order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "",
      address: "123 Main St",
    });

    const order = new Order({
      id: new Id("1"),
      client,
      products: [
        new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Product 1",
          salesPrice: 100,
        }),
        new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "Product 2",
          salesPrice: 200,
        }),
      ],
    });

    const repository = new CheckoutRepository();
    await repository.addOrder(order);
  });
});
