import React from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'

// Internal dependencies
import AddToCart from '../components/addToCart'
import Layout from '../components/Layout'

const Product: React.FC<ProductProps> = ({ data }) => {
  const {
    wp: {
      product: { name, databaseId, shortDescription },
    },
  } = data

  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
        <Box>
          <Heading as="h1" mb={4}>
            {name}
          </Heading>
          {shortDescription && (
            <Box
              mb={10}
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
          )}
          <AddToCart productId={databaseId} />
        </Box>
      </SimpleGrid>
    </Layout>
  )
}

type ProductProps = PageProps<ProductQuery>

type ProductQuery = {
  wp: {
    product: {
      slug: string
      name?: string
      databaseId: number
      shortDescription?: string
    }
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
