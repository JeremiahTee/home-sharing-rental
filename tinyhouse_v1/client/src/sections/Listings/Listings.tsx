import React from "react";
import { server } from "../../lib/api";
import { ListingsData } from "./types";
import { DeleteListingData, DeleteListingVariables } from "./types";

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}`;

const DELETE_LISTINGS = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

const fetchListings = async () => {
  const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
  console.log(data);
};

const deleteListing = async () => {
  const { data } = await server.fetch<
    DeleteListingData,
    DeleteListingVariables
  >({
    query: DELETE_LISTINGS,
    variables: {
      id: "6481558949fbfbdd35b339e4"
    }
  });

  console.log("deleted: ", data);
};

export const Listings = ({ title }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListing}>Delete a Listing</button>
    </div>
  );
};
