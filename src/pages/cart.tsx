import { useAppState } from '../components/context'
import Layout from '../components/Layout'
import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Cart as CartType } from '../../types/Cart'
import { Link as GatsbyLink } from 'gatsby'

const Cart: React.FC = () => {
  // context

  // lazy query - maybeGetCart

  // remove all items mutation

  // useEffect maybe

  // loading...

  // updating...

  // if !cart || cart?.contents.itemCount === 0 return 'empty'

  return (
    <Layout>
      <Heading as="h1" mb={6}>
        Cart
      </Heading>
      <Heading size="md">Items</Heading>
      <Box>Placeholder</Box>
      <Box my={6}>
        <Heading size="md">Summary</Heading>
        <Box>Subtotal: TBD</Box>
        <Box>Shipping: TBD</Box>
        <Box>Total: TBD</Box>
      </Box>
      <ButtonGroup spacing={4}>
        <Button as={GatsbyLink} to="/checkout" colorScheme="pink">
          Checkout
        </Button>
        <Button>Remove all</Button>
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
