import "./App.css";
import { Button } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import styled from "styled-components";
import Searchbar from "./components/searchbar/Searchbar";
import Contact from "./components/contact/Contact";
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TContact } from "./components/contact/Contact.dto";
import AddContactModal from "./components/contact/AddContactModal";
import { DELETE_CONTACT, GET_CONTACTS } from "./components/contact/contact.gql";

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

const ContactsContainer = styled.div`
  border-radius: 5px;
  border: 1px solid grey;
`;

const App = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const {
    loading: getContactsLoading,
    error: getContactsError,
    data: getContactsData,
    refetch: refetchContacts,
  } = useQuery(GET_CONTACTS);
  const filteredData = getContactsData?.getContacts?.filter(
    (contact: TContact) => contact.lastName.includes(searchInput)
  );

  const [
    deleteContact,
    { loading: deleteContactLoading, error: deleteContactError },
  ] = useMutation(DELETE_CONTACT);

  const [addContactModalState, setAddContactModalState] = React.useState(false);

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact({
        variables: {
          id,
        },
      });

      refetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  if (getContactsLoading || deleteContactLoading) return <p>Loading...</p>;
  if (getContactsError || deleteContactError) return <p>Error :(</p>;

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

      <Searchbar onChange={(input) => setSearchInput(input)} />

      {filteredData?.length !== 0 ? (
        <ContactsContainer>
          {filteredData.map(
            (contact: TContact, index: number, array: TContact[]) => (
              <Contact
                key={contact.id}
                id={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                phoneNumber={contact.phoneNumber}
                last={index === array.length - 1}
                deleteContact={() => handleDeleteContact(contact.id)}
              />
            )
          )}
        </ContactsContainer>
      ) : (
        <TitleContainer>
          <Subtitle>No contacts to show ...</Subtitle>
        </TitleContainer>
      )}

      <AddContactModal
        open={addContactModalState}
        onClose={() => {
          refetchContacts();
          setAddContactModalState(false);
        }}
      />
    </Container>
  );
};

export default App;
