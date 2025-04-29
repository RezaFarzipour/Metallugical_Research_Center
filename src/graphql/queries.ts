import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  {
    query MyQuery {
      blogs {
        coverImage
        id
        slug
        tags
        title
      }
    }
  }
`;
