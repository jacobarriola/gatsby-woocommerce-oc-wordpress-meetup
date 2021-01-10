import React from 'react'
import { Heading, Text, Box } from '@chakra-ui/react'
import { PageProps } from 'gatsby'
import Layout from '../../components/Layout'
import { Order } from '../../../types/Order'

const OrderReceived: React.FC<PageProps> = ({ location }) => {
  const order = location.state as Order

  const { orderNumber, total, lineItems } = order

  return (
    <Layout>
      <Heading as="h1" mb={6}>
        Thank You!
      </Heading>
      <Text>
        Your order, <strong>{orderNumber}</strong> was received.
      </Text>
      <Text>
        Total: <strong>{total}</strong>
      </Text>
      <Heading as="h2" size="md" mt={10}>
        What you bought
      </Heading>
      {lineItems.nodes.map(({ product }) => {
        return <Box key={product.databaseId}>{product.name}</Box>
      })}
    </Layout>
  )
}

export default OrderReceived
