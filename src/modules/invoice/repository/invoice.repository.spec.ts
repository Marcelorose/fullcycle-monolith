import { Sequelize } from 'sequelize-typescript';

import Address from '../../@shared/domain/value-object/address';
import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../domain/invoice.entity';
import InvoiceItem from '../domain/invoiceItem.entity';
import { InvoiceModel } from './invoice.model';
import InvoiceRepository from './invoice.repository';
import { InvoiceItemModel } from './invoiceItem.model';

describe("Invoice Repository test", () => {

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

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Lucian",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
      ),
      items: [
        new InvoiceItem({
          id: new Id("1"),
          name: "item 1",
          price: 100,
        }),
        new InvoiceItem({
          id: new Id("2"),
          name: "item 2",
          price: 200,
        })
      ],
    })

    const repository = new InvoiceRepository()
    await repository.generate(invoice)

    const invoiceDB = await InvoiceModel.findOne({
      where: { id: "1" },
      include: [InvoiceItemModel],
    })

    expect(invoiceDB).toBeDefined()
    expect(invoiceDB.id).toEqual(invoice.id.id)
    expect(invoiceDB.name).toEqual(invoice.name)
    expect(invoiceDB.document).toEqual(invoice.document)
    expect(invoiceDB.street).toEqual(invoice.address.street)
    expect(invoiceDB.number).toEqual(invoice.address.number)
    expect(invoiceDB.complement).toEqual(invoice.address.complement)
    expect(invoiceDB.city).toEqual(invoice.address.city)
    expect(invoiceDB.state).toEqual(invoice.address.state)
    expect(invoiceDB.zipcode).toEqual(invoice.address.zipCode)
    expect(invoiceDB.items).toHaveLength(2)
    expect(invoiceDB.items[0].id).toEqual(invoice.items[0].id.id)
    expect(invoiceDB.items[0].name).toEqual(invoice.items[0].name)
    expect(invoiceDB.items[0].price).toEqual(invoice.items[0].price)
    expect(invoiceDB.items[1].id).toEqual(invoice.items[1].id.id)
    expect(invoiceDB.items[1].name).toEqual(invoice.items[1].name)
    expect(invoiceDB.items[1].price).toEqual(invoice.items[1].price)
    expect(invoiceDB.createdAt).toStrictEqual(invoice.createdAt)
    expect(invoiceDB.total).toStrictEqual(300)
  })

  it("should find a invoice", async () => {

    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Lucian',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",
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
      total: 300,
      createdAt: new Date(),
    },
    {
      include: [InvoiceItemModel],
    })

    const repository = new InvoiceRepository()
    const result = await repository.find(invoice.id)

    expect(result.id.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipcode)
    expect(result.items).toHaveLength(2)
    expect(result.items[0].id.id).toEqual(invoice.items[0].id)
    expect(result.items[0].name).toEqual(invoice.items[0].name)
    expect(result.items[0].price).toEqual(invoice.items[0].price)
    expect(result.items[1].id.id).toEqual(invoice.items[1].id)
    expect(result.items[1].name).toEqual(invoice.items[1].name)
    expect(result.items[1].price).toEqual(invoice.items[1].price)
    expect(result.total).toStrictEqual(invoice.total)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
  })
})
