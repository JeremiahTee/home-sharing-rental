import { Database, Listing } from "./../../../lib/types";
// interface types to better define types of a resolver map
import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";

// resolvers object is a map that relates schema fields to functions that resolve those fields
export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deletedResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deletedResult.value) {
        throw new Error("failed to delete listing");
      }

      return deletedResult.value;
    }
  },
  // Resolver to explicitly map ID
  Listing: {
    id: (listing: Listing): string => listing._id.toString() // _id is type of objectId
  }
};
