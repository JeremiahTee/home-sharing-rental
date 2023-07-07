import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User
} from "./sections";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/api"
});

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

const App = () => {
  return (
    <Layout id="app">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings/:location?" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </Router>
    </Layout>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
