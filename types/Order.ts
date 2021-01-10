import { CartProduct } from './CartProduct'

export type Order = {
  orderNumber: number
  total: string
  lineItems: {
    nodes: Array<{ product: CartProduct }>
  }
}
