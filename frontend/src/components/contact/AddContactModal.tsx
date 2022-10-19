import { gql } from "@apollo/client";
import { Button, Modal, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import React from "react";

const ADD_CONTACT = gql`
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

type AddContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  width: 500px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: white;
  border-radius: 5px;

  padding 20px;
`;

const AddContactModal = ({ open, onClose }: AddContactModalProps) => {
  const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const submitContact = async () => {
    try {
      await addContact({
        variables: {
          firstName,
          lastName,
          phoneNumber,
        },
      });

      // if (res.data) addContactToArray(res.data.addContact);
      // console.log(x.data);
    } catch (err) {
      console.log(err);
    }

    onClose();
  };

  if (loading) return <div>"Submitting..."</div>;
  if (error) return <div>`Submission error! ${error.message}`</div>;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Insert contact details
        </Typography>
        <br />
        <TextField
          label="First Name"
          variant="outlined"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <Button variant="contained" onClick={() => submitContact()}>
          Create New Contact
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default AddContactModal;
