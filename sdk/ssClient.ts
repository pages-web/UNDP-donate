import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_MAIN_API_DOMAIN}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const cookie = `pos-config-token=${process.env.NEXT_PUBLIC_POS_TOKEN}`;
    return {
      headers: {
        ...headers,
        cookie,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
});
