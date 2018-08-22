import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import { auth } from "./Mutation/auth";
import tweet from "./Mutation/tweets";
import { AuthPayload } from "./AuthPayload";
import follow from "./Mutation/followOtherUsers";

export const resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...tweet,
    ...follow
  },
  AuthPayload
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);
