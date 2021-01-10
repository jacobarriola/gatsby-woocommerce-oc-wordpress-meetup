import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Layout from '../../components/Layout'
import { Heading } from '@chakra-ui/react'
import CheckoutForm from '../../components/CheckoutForm'

const stripePromise = loadStripe(
  'pk_test_51I4VSyL2t1PuiY3s0VmhCOmJpPTN2CBXxcCBovLDsXCQ3ljN5qAhXeXTuc5vXRWtKg6xAJZqrUP09MUFCp0HlnkL00VpO69eu4'
)

const Checkout: React.FC = () => {
  return (
    <Layout>
      <Heading as="h1" mb={6}>
        Checkout
      </Heading>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  )
}

export default Checkout
