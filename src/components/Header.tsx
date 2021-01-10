import { Box, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useAppState } from './context'

const Header: React.FC = () => {
  const { cart } = useAppState()

  return (
    <Box as="header" d="flex" mb={10}>
      <Link as={GatsbyLink} to="/" textDecor="underline">
        Home
      </Link>
      <Link as={GatsbyLink} ml="auto" to="/cart">
        Cart {cart?.contents.itemCount || 0}
      </Link>
    </Box>
  )
}

export default Header
