import clientFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import invoiceFacadeFactory from '../../invoice/factory/invoice.facade.factory';
import paymentFacadeFactory from '../../payment/factory/payment.facade.factory';
import productFacadeFactory from '../../product-adm/factory/facade.factory';
import catalogFacadeFactory from '../../store-catalog/factory/facade.factory';
import CheckoutFacade from '../facade/checkout.facade';
import CheckoutRepository from '../repository/checkout.repository';
import PlaceOrderUseCase from '../usecase/place-order/place-order.usecase';

export default class CheckoutFacadeFactory {
  static create() {
    const repository = new CheckoutRepository();
    const clientFacade = clientFacadeFactory.create();
    const productFacade = productFacadeFactory.create();
    const catalogFacade = catalogFacadeFactory.create();
    const invoiceFacade = invoiceFacadeFactory.create();
    const paymentFacade = paymentFacadeFactory.create();
    const placeOrderUseCase = new PlaceOrderUseCase(clientFacade, productFacade, catalogFacade, repository, invoiceFacade, paymentFacade);
    const facade = new CheckoutFacade({
      placeOrderUseCase,
    });

    return facade;
  }
}
