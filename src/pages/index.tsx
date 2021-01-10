import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { Box, Heading } from '@chakra-ui/react'

import Layout from '../components/Layout'

const Index: React.FC<IndexProps> = ({ data }) => {
  return (
    <Layout>
      <Heading as="h1" mb={10}>
        Home
      </Heading>
      <Box>Placeholder...</Box>
    </Layout>
  )
}

type IndexProps = PageProps & {
  data: {
    wp: {
      products: {
        nodes: Array<{ name?: string; id: string; slug: string }>
      }
    }
  }
}

export default Index
