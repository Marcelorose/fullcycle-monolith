import express from 'express';

import CheckoutFactory from '../../../modules/checkout/factory/checkout.facade.factory';

export const checkoutRouter = express.Router();

checkoutRouter.post("/", async (req, res) => {
  const checkoutFactory = CheckoutFactory.create();

  try {
    const transactionDTO = {
      clientId: req.body.clientId,
      products: req.body.products,
    }

    const output = await checkoutFactory.placeOrder(transactionDTO);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
