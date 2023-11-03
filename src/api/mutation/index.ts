import { gql } from "@apollo/client";

export const CREATE_POSTS = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
