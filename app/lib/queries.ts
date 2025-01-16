// import { gql } from "@apollo/client";

import { gql } from "graphql-request";

export const countryListsQuery = gql`
  query GetCountryLists {
    countries {
      code
      name
    }
  }
`;
