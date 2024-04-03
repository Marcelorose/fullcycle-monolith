export interface PlaceOrderFacadeInputDto {
  clientId: string,
  products: {
    productId: string,
  }[],
}

export default interface CheckoutFacadeInterface {
  placeOrder(input: PlaceOrderFacadeInputDto): Promise<null>;
}
