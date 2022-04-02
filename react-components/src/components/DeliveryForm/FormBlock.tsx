import React from 'react';
import styled from 'styled-components';

const FormBlockWrapper = styled.div`
  background-color: rgb(31, 109, 131);
  margin-bottom: 1.5rem;
  padding: 2rem 2rem 3.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 5px 10px 10px 5px rgba(18, 74, 90, 0.25);
`;

const FormBlockTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #fff;
`;

const FormBlockContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;

  @media (max-width: ${(props: { wrapContentWidth: number }) => props.wrapContentWidth}px) {
    flex-wrap: wrap;
  }
`;

type FormBlockProps = { title: string; wrapContentWidth?: number; children: React.ReactNode };

export const FormBlock = ({ title, wrapContentWidth = 768, children }: FormBlockProps) => {
  return (
    <FormBlockWrapper>
      <FormBlockTitle>{title}</FormBlockTitle>
      <FormBlockContentWrapper wrapContentWidth={wrapContentWidth}>
        {children}
      </FormBlockContentWrapper>
    </FormBlockWrapper>
  );
};
