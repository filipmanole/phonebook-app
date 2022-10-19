import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  width: 500px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: white;
  border-radius: 5px;

  padding 20px;
`;

export default ModalContainer;
