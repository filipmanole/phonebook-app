import { Button, Modal, TextField, Typography } from "@mui/material";
import styled from "styled-components";

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
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Insert contact details
        </Typography>
        <br />
        <TextField label="First Name" variant="outlined" />
        <TextField label="Last Name" variant="outlined" />
        <TextField label="Phone Number" variant="outlined" />
        <br />
        <Button variant="contained">Create New Contact</Button>
      </ModalContainer>
    </Modal>
  );
};

export default AddContactModal;
