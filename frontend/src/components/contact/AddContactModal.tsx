import { Button, Modal, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import React from "react";
import ModalContainer from "./Modal.style";
import { ADD_CONTACT } from "./contact.gql";

type AddContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddContactModal = ({ open, onClose }: AddContactModalProps) => {
  const [addContact, { loading, error }] = useMutation(ADD_CONTACT);

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
