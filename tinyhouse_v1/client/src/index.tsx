import React from "react";
import ReactDOM from "react-dom/client";
import { Listings } from "./sections";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/api"
});

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <ApolloProvider client={client}>
      <Listings title="TinyHouse Listings" />
    </ApolloProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
