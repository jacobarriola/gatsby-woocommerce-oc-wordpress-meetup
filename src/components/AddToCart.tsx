import { useMutation, gql } from '@apollo/client'
import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { Cart } from '../../types/Cart'
import { useAppState } from './context'

const AddToCart: React.FC<{ productId: number }> = ({ productId }) => {
  const { setCart } = useAppState()

  function handleAddToCart() {
    alert('added to cart!')
  }

  return <Button onClick={() => handleAddToCart()}>Add To Cart</Button>
}

export default AddToCart
