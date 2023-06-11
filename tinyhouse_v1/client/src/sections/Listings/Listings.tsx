import React from "react";
import { List, Avatar, Button, Spin, Alert } from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";
import { ListingSkeleton } from "./components";
import "./styles/listings.css";

const LISTINGS = gql`
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
  }
`;

const DELETE_LISTINGS = gql`
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

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTINGS);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={
              <Avatar src={listing.image} shape="square" size={48}></Avatar>
            }
          />
        </List.Item>
      )}
    ></List>
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingSkeleton title={title} error />
      </div>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Something went wrong... please try again"
      className="listings__alert"
    />
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Something went wrong when deleting. Please try again later.</h4>
  ) : null;

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {deleteListingErrorAlert}
        <h2>{title}</h2>
        {listingsList}
        {deleteListingErrorMessage}
      </Spin>
    </div>
  );
};
