import React from "react";
import { server } from "../../lib/api";
import { ListingsData } from "./types";
import { DeleteListingData, DeleteListingVariables } from "./types";
import { useQuery } from "../../lib/api/useQuery";

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
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTINGS,
      variables: {
        id: id
      }
    });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button key={listing.id} onClick={() => deleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong... please try again later</h2>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
    </div>
  );
};
