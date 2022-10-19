import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
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
  justify-content: space-between;
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
`;

type ContactProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  last: boolean;
};

const Contact = (props: ContactProps) => {
  const formatPhoneNumber = (phoneNumber: string) =>
    phoneNumber.length === 10
      ? phoneNumber.slice(0, 3) +
        "-" +
        phoneNumber.slice(3, 6) +
        "-" +
        phoneNumber.slice(6)
      : phoneNumber;

  return (
    <>
      <ContactContainer>
        <ContactDetailsContainer>
          <ContactName>
            {"" + props.firstName + " " + props.lastName}
          </ContactName>
          <ContactPhoneNumberContainer>
            <PhoneIcon />
            <ContactPhoneNumber>
              {formatPhoneNumber(props.phoneNumber)}
            </ContactPhoneNumber>
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
