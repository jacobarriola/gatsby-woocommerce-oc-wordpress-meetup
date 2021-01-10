import React from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'

// Internal dependencies
import Layout from '../components/Layout'
import { Product as ProductType } from '../../types/Product'

const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
        <Heading as="h1">Placeholder</Heading>
      </SimpleGrid>
    </Layout>
  )
}

type ProductProps = PageProps<ProductQuery>

type ProductQuery = {
  wp: {
    product: ProductType
  }
}

export const query = graphql`
  query PRODUCT($slug: ID!) {
    wp {
      product(id: $slug, idType: SLUG) {
        name
        slug
        databaseId
        shortDescription
      }
    }
  }
`

export default Product
