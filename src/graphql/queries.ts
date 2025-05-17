import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  
    query getAllBlogs {
      blogs {
        coverImage
        id
        slug
        tags
        title
      }
    }
  
`;
