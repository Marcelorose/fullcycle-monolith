import { Sequelize } from 'sequelize-typescript';

import CheckoutFacadeFactory from '../factory/checkout.facade.factory';
import ClientModel from '../repository/client.model';
import OrderModel from '../repository/order.model';
import ProductModel from '../repository/product.model';

describe("CheckoutFacade test", () => {
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

  it("should create a order", async () => {
    const facade = CheckoutFacadeFactory.create();

    const input = {
      clientId: "1",
      products: [
        {
          productId: "1",
        },
        {
          productId: "2",
        }
      ],
    };

    await facade.placeOrder(input);

    // expect(output.transactionId).toBeDefined();
    // expect(output.orderId).toBe(input.orderId);
    // expect(output.amount).toBe(input.amount);
    // expect(output.status).toBe("approved");
  });
});
