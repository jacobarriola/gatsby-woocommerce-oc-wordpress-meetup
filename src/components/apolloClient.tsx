import fetch from 'cross-fetch'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client'

const url = process.env.GATSBY_API_URL

const httpLink = new HttpLink({
  uri: url,
  fetch,
})

/**
 * Session handler - if we have a session token in localStorage, add it to the GraphQL request as a Session header.
 *
 * @ref https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
export const wooSessionMiddleware = new ApolloLink((operation, forward) => {
  // Don't run this while Gatsby is building. Window is not defined
  // @ref: https://www.gatsbyjs.org/docs/debugging-html-builds/
  if (typeof window === 'undefined') {
    return forward(operation)
  }

  /**
   * If session data exists in local storage, set value as session header.
   */
  const session = window.localStorage.getItem('woo-session')
  if (session) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'woocommerce-session': `Session ${session}`,
      },
    }))
  }

  return forward(operation)
})

/**
 * Session handler - catch the incoming session token and store it in localStorage, for future GraphQL requests.
 *
 * @ref https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
export const wooSessionAfterware = new ApolloLink((operation, forward) => {
  // Don't run this while Gatsby is building. Window is not defined
  // @ref: https://www.gatsbyjs.org/docs/debugging-html-builds/
  if (typeof window === 'undefined') {
    return forward(operation)
  }

  return forward(operation).map(response => {
    const context = operation.getContext()

    const {
      response: { headers },
    } = context

    const session = headers.get('woocommerce-session')

    // Bail if no session was sent
    if (!session) {
      return response
    }

    // Bail if we already have the session
    if (window.localStorage.getItem('woo-session') === session) {
      return response
    }

    // Set WC session to localStorage
    window.localStorage.setItem('woo-session', session)

    return response
  })
})

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Cart: {
        keyFields: ['total'], // cart doesn't have an id, so per docs we need to track it somehow to make cache work as expected. This warning came up during coupons on the cart page
      },
    },
  }),
  link: from([wooSessionMiddleware, wooSessionAfterware, httpLink]),
})
