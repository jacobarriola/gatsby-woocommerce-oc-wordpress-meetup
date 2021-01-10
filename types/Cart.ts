import { CartProduct } from './CartProduct'

export type Cart = {
  subtotal?: string
  total?: string
  shippingTotal?: string
  contents: {
    itemCount: number
    nodes: Array<{
      key: string
      quantity: number
      product: { node: CartProduct }
    }>
  }
}
