import React from 'react';
import Link from 'next/link';
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

const CategoryPostItem = styled(Link)`
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: #f6f6ef;
  border-radius: 4px;
  box-shadow: 1px 1px 3px #aaa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type Props = {
  href: string;
  name: string;
};

export default function CategoryItem({ href, name }: Props) {
  return (
    <CategoryPostContainer>
      <CategoryPostItem href={href}>
        {name}
      </CategoryPostItem>
    </CategoryPostContainer>
  );
}
