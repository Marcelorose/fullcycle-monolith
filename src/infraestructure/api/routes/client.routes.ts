import express from 'express';

import Address from '../../../modules/@shared/domain/value-object/address';
import ClientRepository from '../../../modules/client-adm/repository/client.repository';
import AddClientUseCase from '../../../modules/client-adm/usecase/add-client/add-client.usecase';

export const clientRouter = express.Router();

clientRouter.post("/", async (req, res) => {
  const useCase = new AddClientUseCase(new ClientRepository());

  try {
    const address = new Address(req.body.address.street, req.body.address.number, req.body.address.complement, req.body.address.city, req.body.address.state, req.body.address.zipcode)
    const clientDTO = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address,
    };
    const output = await useCase.execute(clientDTO);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
