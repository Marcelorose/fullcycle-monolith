import Address from '../../../@shared/domain/value-object/address';
import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/invoice.entity';
import InvoiceItem from '../../domain/invoiceItem.entity';
import FindInvoiceUseCase from './find-invoice.usecase';

const invoice = new Invoice({
  id: new Id(),
  name: 'Marcelo',
  document: '10020102',
  address: new Address(
    'Rua 123',
    '99',
    'Casa Verde',
    'Criciúma',
    'SC',
    '88888-888',
  ),
  items: [
    new InvoiceItem({
      id: new Id('1'),
      name: 'item 1',
      price: 100,
    }),
    new InvoiceItem({
      id: new Id('2'),
      name: 'item 2',
      price: 200,
    }),
  ],
})

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find Invoice use case unit test", () => {

  it("should find a invoice", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const result =  await usecase.execute({ id: '1' })

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address.street).toEqual(invoice.address.street)
    expect(result.address.number).toEqual(invoice.address.number)
    expect(result.address.complement).toEqual(invoice.address.complement)
    expect(result.address.city).toEqual(invoice.address.city)
    expect(result.address.state).toEqual(invoice.address.state)
    expect(result.address.zipCode).toEqual(invoice.address.zipCode)
    expect(result.items).toHaveLength(2)
    expect(result.items[0].id).toEqual(invoice.items[0].id.id)
    expect(result.items[0].name).toEqual(invoice.items[0].name)
    expect(result.items[0].price).toEqual(invoice.items[0].price)
    expect(result.items[1].id).toEqual(invoice.items[1].id.id)
    expect(result.items[1].name).toEqual(invoice.items[1].name)
    expect(result.items[1].price).toEqual(invoice.items[1].price)
    expect(result.total).toEqual(300)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
  })
})
