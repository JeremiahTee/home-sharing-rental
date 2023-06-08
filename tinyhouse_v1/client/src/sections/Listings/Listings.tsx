import React, { useState } from "react";
import { server } from "../../lib/api";
import { Listing, ListingsData } from "./types";
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

export const Listings = ({ title }: Props) => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTINGS,
      variables: {
        id: id
      }
    });

    fetchListings();
  };

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <>
            <li key={listing.id}>{listing.title}</li>
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  );
};
