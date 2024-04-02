import { Sequelize } from 'sequelize-typescript';

import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import { InvoiceModel } from '../repository/invoice.model';
import { InvoiceItemModel } from '../repository/invoiceItem.model';

describe("Invoice Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate a invoice", async () => {

    const facade = InvoiceFacadeFactory.create()

    const input = {
      name: 'Marcelo',
      document: '10020102',
      street: 'Rua 123',
      number: '99',
      complement: 'Casa Verde',
      city: 'Criciúma',
      state: 'SC',
      zipCode: '88888-888',
      items: [
        {
          id: '1',
          name: 'item 1',
          price: 100,
        },
        {
          id: '2',
          name: 'item 2',
          price: 200,
        }
      ],
    }

    const invoice = await facade.generate(input)

    expect(invoice).toBeDefined()
    expect(invoice.id).toBeDefined()
    expect(invoice.name).toBe(input.name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.street).toBe(input.street)
    expect(invoice.number).toBe(input.number)
    expect(invoice.complement).toBe(input.complement)
    expect(invoice.city).toBe(input.city)
    expect(invoice.state).toBe(input.state)
    expect(invoice.zipCode).toBe(input.zipCode)
    expect(invoice.items).toHaveLength(2)
    expect(invoice.items[0].id).toBe(input.items[0].id)
    expect(invoice.items[0].name).toBe(input.items[0].name)
    expect(invoice.items[0].price).toBe(input.items[0].price)
    expect(invoice.items[1].id).toBe(input.items[1].id)
    expect(invoice.items[1].name).toBe(input.items[1].name)
    expect(invoice.items[1].price).toBe(input.items[1].price)
  })

  it("should find a invoice", async () => {

    const facade = InvoiceFacadeFactory.create()

    const input = {
      name: "Lucian",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: [
        {
          id: "1",
          name: "item 1",
          price: 100,
        },
        {
          id: "2",
          name: "item 2",
          price: 200,
        }
      ],
    }

    const generatedInvoice = await facade.generate(input)

    const invoice = await facade.find({ id: generatedInvoice.id })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(generatedInvoice.id)
    expect(invoice.name).toBe(input.name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.address.street).toBe(input.street)
    expect(invoice.address.number).toBe(input.number)
    expect(invoice.address.complement).toBe(input.complement)
    expect(invoice.address.city).toBe(input.city)
    expect(invoice.address.state).toBe(input.state)
    expect(invoice.address.zipCode).toBe(input.zipCode)
    expect(invoice.items).toHaveLength(2)
    expect(invoice.items[0].id).toBe(input.items[0].id)
    expect(invoice.items[0].name).toBe(input.items[0].name)
    expect(invoice.items[0].price).toBe(input.items[0].price)
    expect(invoice.items[1].id).toBe(input.items[1].id)
    expect(invoice.items[1].name).toBe(input.items[1].name)
    expect(invoice.items[1].price).toBe(input.items[1].price)
    expect(invoice.total).toBe(300)
    expect(invoice.createdAt).toBeDefined()
  })
})
