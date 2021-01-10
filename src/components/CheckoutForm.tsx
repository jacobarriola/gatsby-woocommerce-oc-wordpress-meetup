import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { gql, useMutation } from '@apollo/client'
import { Source } from '@stripe/stripe-js'
import { navigate } from 'gatsby'
import { Button, toast, useToast } from '@chakra-ui/react'
import { useAppState } from './context'
import { Order } from '../../types/Order'

const CheckoutForm: React.FC = ({}) => {
  const toast = useToast()
  const [formState, setFormState] = useState('IDLE')
  const { setCart } = useAppState()
  const stripe = useStripe()
  const elements = useElements()

  const [checkout] = useMutation<{
    checkout: { order: Order }
  }>(CHECKOUT, {
    onCompleted({ checkout }) {
      handleSuccessfulCheckout({ order: checkout.order })
    },
    onError(error) {
      toast({
        title: 'Error',
        description: 'There was an error with your checkout',
        status: 'error',
      })
      console.error(error)
      setFormState('ERROR')
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormState('LOADING')
    try {
      const source = (await handleStripe()) as Source

      await checkout({
        variables: {
          input: {
            clientMutationId: '12345',
            paymentMethod: 'stripe',
            shippingMethod: 'Flat rate',
            billing: {
              firstName: 'George',
              lastName: 'Costanza',
              address1: `129 West 81st Street, Apartment 5A`,
              city: `New York`,
              state: `NY`,
              postcode: `12345`,
              email: `george@vandaleyindustries.com`,
            },
            metaData: [
              {
                key: `_stripe_source_id`,
                value: source.id,
              },
            ],
          },
        },
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error with your checkout',
        status: 'error',
      })
      console.error(error)
    }
  }

  async function handleStripe(): Promise<Source | Error> {
    if (!stripe || !elements) {
      throw Error(`stripe or elements undefined`)
    }

    const cardElements = elements.getElement(CardElement)

    if (!cardElements) {
      throw Error(`Card elements not found`)
    }

    const { source, error: sourceError } = await stripe.createSource(
      cardElements,
      {
        type: 'card',
      }
    )

    if (sourceError || !source) {
      throw Error(sourceError?.message || `Unknown error generating source`)
    }

    return source
  }

  function handleSuccessfulCheckout({ order }: { order: Order }): void {
    setFormState('IDLE')
    localStorage.removeItem('woo-session')
    setCart(undefined)
    navigate('/checkout/order-received', { state: order })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          hidePostalCode: true,
          style: { base: { fontSize: `18px` } },
        }}
      />
      <Button
        mt={10}
        type="submit"
        disabled={!stripe}
        isLoading={formState === 'LOADING'}
      >
        Pay
      </Button>
    </form>
  )
}

const CHECKOUT = gql`
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        databaseId
        orderNumber
        total
        lineItems {
          nodes {
            product {
              name
              databaseId
            }
          }
        }
      }
    }
  }
`

export default CheckoutForm
