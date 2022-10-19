import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
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
};

const Contact = (props: ContactProps) => {
  return (
    <>
      <ContactContainer>
        <ContactDetailsContainer>
          <ContactName>{props.firstName + " " + props.lastName}</ContactName>
          <ContactPhoneNumberContainer>
            <PhoneIcon />
            <ContactPhoneNumber>{props.phoneNumber}</ContactPhoneNumber>
          </ContactPhoneNumberContainer>
        </ContactDetailsContainer>
        <DeleteButonContainer>
          <DeleteIcon style={{ color: "white" }} />
        </DeleteButonContainer>
      </ContactContainer>
      {!props.last && <hr />}
    </>
  );
};

export default Contact;
