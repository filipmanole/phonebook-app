import { Button, Modal, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import React from "react";
import { TContact } from "./Contact.dto";
import ModalContainer from "./Modal.style";
import { UPDATE_CONTACT } from "./contact.gql";

type UpdateContactModalProps = {
  contact: Omit<TContact, "__typename">;
  open: boolean;
  onClose: () => void;
};

const UpdateContactModal = ({
  contact,
  open,
  onClose,
}: UpdateContactModalProps) => {
  const [updateContact, { loading, error }] = useMutation(UPDATE_CONTACT);

  const [firstName, setFirstName] = React.useState(contact.firstName);
  const [lastName, setLastName] = React.useState(contact.lastName);
  const [phoneNumber, setPhoneNumber] = React.useState(contact.phoneNumber);

  const handleUpdate = async () => {
    try {
      await updateContact({
        variables: {
          id: contact.id,
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
          Update contact details
        </Typography>
        <br />
        <TextField
          value={firstName}
          label="First Name"
          variant="outlined"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          value={lastName}
          label="Last Name"
          variant="outlined"
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          value={phoneNumber}
          label="Phone Number"
          variant="outlined"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <br />
        <Button variant="contained" onClick={() => handleUpdate()}>
          Update Contact
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default UpdateContactModal;
