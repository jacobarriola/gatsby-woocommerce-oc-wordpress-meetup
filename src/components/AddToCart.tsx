import { useMutation, gql } from '@apollo/client'
import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useAppState } from './context'

const AddToCart: React.FC<{ productId: number }> = ({ productId }) => {
  const toast = useToast()
  const { setCart } = useAppState()
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    onCompleted: ({ addToCart }) => {
      toast({
        title: 'Added to cart',
        status: 'success',
      })
      setCart(addToCart.cart)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'There was an error adding your product',
        status: 'error',
      })
    },
  })

  function handleAddToCart() {
    addToCart({
      variables: { input: { productId, quantity: 1, clientMutationId: '123' } },
    })
  }

  return (
    <Button
      onClick={() => handleAddToCart()}
      isLoading={loading}
      loadingText="Adding to cart"
    >
      Add To Cart
    </Button>
  )
}

const ADD_TO_CART = gql`
  mutation ATC($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        subtotal
        total
        shippingTotal
        contents {
          itemCount
          nodes {
            product {
              node {
                name
                sku
                databaseId
                ... on SimpleProduct {
                  price
                }
              }
            }
          }
        }
      }
    }
  }
`

export default AddToCart
