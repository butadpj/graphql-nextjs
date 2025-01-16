// import { gql } from "@apollo/client";

import { gql } from "graphql-request";

// Define mutation
export const ADD_COUNTRY = gql`
  mutation AddCountry($code: String!, $name: String!) {
    addCountry(code: $code, name: $name) {
      code
      name
    }
  }
`;
