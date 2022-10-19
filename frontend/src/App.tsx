import "./App.css";
import { Button } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import styled from "styled-components";
import Searchbar from "./components/searchbar/Searchbar";
import Contact from "./components/contact/Contact";
import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { TContact } from "./components/contact/Contact.dto";
import AddContactModal from "./components/contact/AddContactModal";

const GET_CONTACTS = gql`
  query GetContacts {
    getContacts {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(args: { id: $id }) {
      id
      firstName
      lastName
      phoneNumber
    }
  }
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  width: 500px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  & > * {
    padding: 10px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const AddContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SearchContactsContainer = styled.div``;

const ContactsContainer = styled.div`
  border-radius: 5px;
  border: 1px solid grey;
`;

const App = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const { loading, error, data, refetch } = useQuery(GET_CONTACTS);
  const filteredData = data?.getContacts?.filter((contact: TContact) =>
    contact.lastName.includes(searchInput)
  );

  const [
    deleteContact,
    {
      data: deleteContactData,
      loading: deleteContactLoading,
      error: deleteContactError,
    },
  ] = useMutation(DELETE_CONTACT);

  const [addContactModalState, setAddContactModalState] = React.useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteContact({
        variables: {
          id,
        },
      });

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || deleteContactLoading) return <p>Loading...</p>;
  if (error || deleteContactError) return <p>Error :(</p>;

  return (
    <Container>
      <TitleContainer>
        <RecentActorsIcon sx={{ fontSize: 50 }} />
        <Title>Phone Book App</Title>
      </TitleContainer>

      <AddContactsContainer>
        <Subtitle>Contacts</Subtitle>
        <Button
          variant="contained"
          onClick={() => setAddContactModalState(true)}
        >
          <b>+ Add Contact</b>
        </Button>
      </AddContactsContainer>

      <SearchContactsContainer>
        <Searchbar onChange={(input) => setSearchInput(input)} />
      </SearchContactsContainer>

      {filteredData?.length !== 0 ? (
        <ContactsContainer>
          {data.getContacts
            .filter((contact: TContact) =>
              contact.lastName.includes(searchInput)
            )
            .map((contact: TContact, index: number, array: TContact[]) => (
              <Contact
                key={contact.id}
                id={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                phoneNumber={contact.phoneNumber}
                last={index === array.length - 1}
                delete={() => handleDelete(contact.id)}
              />
            ))}
        </ContactsContainer>
      ) : (
        "No contacts to show ..."
      )}

      <AddContactModal
        open={addContactModalState}
        onClose={() => {
          refetch();
          setAddContactModalState(false);
        }}
      />
    </Container>
  );
};

export default App;
