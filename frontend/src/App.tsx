import "./App.css";
import { Button } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import styled from "styled-components";
import Searchbar from "./components/searchbar/Searchbar";
import Contact from "./components/contact/Contact";
import React from "react";
import { useQuery, gql } from "@apollo/client";
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
  const { loading, error, data } = useQuery(GET_CONTACTS);

  const [addContactModalState, setAddContactModalState] = React.useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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

      <ContactsContainer>
        {data.getContacts
          .filter((contact: TContact) => contact.lastName.includes(searchInput))
          .map((contact: TContact, index: number, array: TContact[]) => (
            <Contact
              key={contact.id}
              id={contact.id}
              firstName={contact.firstName}
              lastName={contact.lastName}
              phoneNumber={contact.phoneNumber}
              last={index === array.length - 1}
            />
          ))}
      </ContactsContainer>

      <AddContactModal
        open={addContactModalState}
        onClose={() => setAddContactModalState(false)}
      />
    </Container>
  );
};

export default App;
