'use client';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  ApolloProvider
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink: any = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_MAIN_API_DOMAIN}/graphql`,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const cookie = `pos-config-token=${process.env.NEXT_PUBLIC_POS_TOKEN}`;
  const token = sessionStorage.getItem('token') || '';
  return {
    headers: {
      ...headers,
      cookie,
      'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_MAIN_API_DOMAIN}/graphql`,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NEXT_PUBLIC_WS_DOMAIN}`
  })
);

const httpLinkWithMiddleware = authLink.concat(httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithMiddleware
);

const client = new ApolloClient({
  ssrMode: typeof window !== 'undefined',
  cache: new InMemoryCache(),
  link: splitLink
});

const Apollo = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
