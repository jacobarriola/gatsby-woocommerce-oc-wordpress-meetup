import { useAppState } from '../components/context'
import Layout from '../components/Layout'
import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Cart as CartType } from '../../types/Cart'
import { Link as GatsbyLink } from 'gatsby'

const Cart: React.FC = () => {
  const { cart, setCart } = useAppState()
  const [maybeGetCart, { loading }] = useLazyQuery<CartQuery>(CART, {
    onCompleted: ({ cart }) => {
      setCart(cart)
    },
  })

  const [removeAllItems, { loading: loadingMutation }] = useMutation(REMOVE, {
    onCompleted() {
      setCart(undefined)
    },
    update(cache) {
      cache.writeQuery({
        query: CART,
        data: undefined,
      })
    },
  })

  useEffect(() => {
    if (cart) {
      return
    }

    maybeGetCart()
  }, [cart, maybeGetCart])

  if (loading) {
    return (
      <Layout>
        <Box>Loading cart...</Box>
      </Layout>
    )
  }

  if (loadingMutation) {
    return (
      <Layout>
        <Box>Updating cart...</Box>
      </Layout>
    )
  }

  if (!cart) {
    return (
      <Layout>
        <Text>Empty cart</Text>
      </Layout>
    )
  }

  if (cart?.contents.itemCount === 0) {
    return (
      <Layout>
        <Text>Empty cart</Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading as="h1" mb={6}>
        Cart
      </Heading>
      <Heading size="md">Items</Heading>
      {cart?.contents.nodes.map(item => {
        const { node } = item.product
        return <Box key={node.databaseId}>{node.name}</Box>
      })}
      <Box my={6}>
        <Heading size="md">Summary</Heading>
        <Box>Subtotal: {cart.subtotal}</Box>
        <Box>Shipping: {cart.shippingTotal}</Box>
        <Box>Total: {cart.total}</Box>
      </Box>
      <ButtonGroup spacing={4}>
        <Button as={GatsbyLink} to="/checkout" colorScheme="pink">
          Checkout
        </Button>
        <Button
          onClick={() =>
            removeAllItems({
              variables: {
                input: {
                  clientMutationId: `1234`,
                  all: true,
                },
              },
            })
          }
        >
          Remove all
        </Button>
      </ButtonGroup>
    </Layout>
  )
}

type CartQuery = {
  cart: CartType
}

const REMOVE = gql`
  mutation RemoveItemFromCart($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        subtotal
        total
        shippingTotal
        contents {
          itemCount
          nodes {
            quantity
            key
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
const CART = gql`
  query Cart {
    cart {
      subtotal
      total
      shippingTotal
      contents {
        itemCount
        nodes {
          quantity
          key
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
`

export default Cart
