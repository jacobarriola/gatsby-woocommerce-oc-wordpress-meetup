import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Layout from '../../components/Layout'
import { Heading } from '@chakra-ui/react'
import CheckoutForm from '../../components/CheckoutForm'

const stripePromise = loadStripe(
  process.env.GATSBY_STRIPE_KEY
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
