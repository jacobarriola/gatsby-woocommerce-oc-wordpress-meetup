import React from 'react'
import { Box, Container } from '@chakra-ui/react'

import Header from './Header'

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Box as="main">{children}</Box>
    </Container>
  )
}

export default Layout
