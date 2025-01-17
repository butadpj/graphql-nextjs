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
export const latestCountryQuery = gql`
  query GetLatestCountry {
    latest_country {
      code
      name
    }
  }
`;
