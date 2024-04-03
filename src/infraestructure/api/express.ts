import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';

import ClientModel from '../client/repository/sequelize/client.model';
import InvoiceModel from '../invoice/repository/sequelize/invoice.model';
import InvoiceItem from '../invoiceItem/repository/sequelize/invoiceItem.model';
import ProductModel from '../product/repository/sequelize/product.model';
import TransactionModel from '../transaction/repository/sequelize/transaction.model';

// import { customerRoute } from "./routes/customer.route";

export const app: Express = express();
app.use(express.json());
// app.use("/customer", customerRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductModel, InvoiceModel, InvoiceItem, TransactionModel]);
  await sequelize.sync();
}
setupDb();
