import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie, hasCookie } from "cookies-next";

const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie("auth");
  const checkToken = hasCookie("auth");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: checkToken ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
