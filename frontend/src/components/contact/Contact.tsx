import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";
import UpdateContactModal from "./UpdateContactModal";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

  cursor: pointer;
`;

const ContactDetailsContainer = styled.div``;

const ContactName = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const ContactPhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: grey;
`;
const ContactPhoneNumber = styled.div`
  font-size: 23px;
  font-weight: bold;
`;

const DeleteButonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #b03e3e;
  padding: 8px;
  border-radius: 5px;

  cursor: pointer;
`;

type ContactProps = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  last: boolean;
  deleteContact: () => void;
};

const Contact = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  last,
  deleteContact,
}: ContactProps) => {
  const [updateContactModalState, setUpdateContactModalState] =
    React.useState(false);

  return (
    <>
      <ContactContainer onClick={() => setUpdateContactModalState(true)}>
        <ContactDetailsContainer>
          <ContactName>{firstName + " " + lastName}</ContactName>
          <ContactPhoneNumberContainer>
            <PhoneIcon />
            <ContactPhoneNumber>{phoneNumber}</ContactPhoneNumber>
          </ContactPhoneNumberContainer>
        </ContactDetailsContainer>
        <DeleteButonContainer onClick={() => deleteContact()}>
          <DeleteIcon style={{ color: "white" }} />
        </DeleteButonContainer>
      </ContactContainer>

      <UpdateContactModal
        contact={{ id, firstName, lastName, phoneNumber }}
        open={updateContactModalState}
        onClose={() => setUpdateContactModalState(false)}
      />
      {!last && <hr />}
    </>
  );
};

export default Contact;
