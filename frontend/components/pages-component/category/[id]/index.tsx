import styled from 'styled-components';

const CategoryPostContainer = styled.div`
  background: white;
  transition: box-shadow 0.1s ease-in;
  &:hover {
    box-shadow: 1px 1px 3px #aaa;
  };
  & + & {
    margin-top: 2rem;
  }
`;

export default CategoryPostContainer;
