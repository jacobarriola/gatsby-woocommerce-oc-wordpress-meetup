import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Layout from '../components/Layout'

const Index: React.FC<IndexProps> = ({ data }) => {
  const {
    wp: {
      products: { nodes: products },
    },
  } = data

  return (
    <Layout>
      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </div>
      ))}
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

export const query = graphql`
  query AllProducts {
    wp {
      products(first: 3) {
        nodes {
          name
          id
          slug
        }
      }
    }
  }
`

export default Index
