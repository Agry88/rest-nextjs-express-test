import styled from 'styled-components';

const BackgroundButton = styled.button`
  background: "#ececec";
  border: 0;
  padding: 1rem 2rem;
  cursor: pointer;
  & + & {
    margin-left: 1rem;
  }
`;

export default BackgroundButton;
