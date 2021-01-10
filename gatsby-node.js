// Create product pages
exports.createPages = async function ({ actions, graphql, reporter }) {
  const { data } = await graphql(`
    query {
      wp {
        products(first: 3) {
          nodes {
            slug
          }
        }
      }
    }
  `)

  if (!data || !data.wp || !data.wp.products) {
    reporter.panic('Error creating pages')
    return
  }

  const products = data.wp.products.nodes || []

  if (products.length === 0) {
    reporter.info('No products return during page creation process.')
  }

  products.forEach(({ slug }) => {
    actions.createPage({
      path: `/product/${slug}`,
      component: require.resolve(`./src/templates/product.tsx`),
      context: { slug },
    })
  })
}
