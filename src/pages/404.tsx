import { Heading } from '@chakra-ui/react'
import { PageProps } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'

const NotFound: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Heading as="h1">Not Found</Heading>
    </Layout>
  )
}

export default NotFound
