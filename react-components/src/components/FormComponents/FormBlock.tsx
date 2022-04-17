import React from 'react';
import styled from 'styled-components';

const FormBlockWrapper = styled.div`
  background-color: rgb(31, 109, 131);
  margin-bottom: 1.5rem;
  padding: 2rem 2rem 3.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 5px 10px 10px 5px rgba(18, 74, 90, 0.25);

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;

const FormBlockTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #fff;
`;

const FormBlockContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
`;

type FormBlockProps = { title: string; children: React.ReactNode };

export const FormBlock = ({ title, children }: FormBlockProps) => {
  return (
    <FormBlockWrapper>
      <FormBlockTitle>{title}</FormBlockTitle>
      <FormBlockContentWrapper>{children}</FormBlockContentWrapper>
    </FormBlockWrapper>
  );
};
