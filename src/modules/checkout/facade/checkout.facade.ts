import UseCaseInterface from '../../@shared/usecase/use-case.interface';
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto } from './facade.interface';

export interface UseCasesProps {
  placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private placeOrderUseCase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this.placeOrderUseCase = usecasesProps.placeOrderUseCase;
  }

  placeOrder(input: PlaceOrderFacadeInputDto): Promise<null> {
    return this.placeOrderUseCase.execute(input);
  }
}
