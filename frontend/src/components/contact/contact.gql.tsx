import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts {
    getContacts {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation AddContact(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    addContact(
      args: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateContact(
      args: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(args: { id: $id }) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;
