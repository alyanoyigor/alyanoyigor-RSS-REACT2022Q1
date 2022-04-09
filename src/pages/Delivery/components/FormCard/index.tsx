import React from 'react';
import styled from 'styled-components';

const FormCardWrapper = styled.div`
  padding: 1.5rem;
  background-color: #2d333a;
  border-radius: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media screen and (max-width: 520px) {
    flex-wrap: wrap-reverse;
  }
`;

const FullNameTitle = styled.h3`
  margin: 0;
  & .gender {
    margin-right: 0.25rem;
  }
`;

const Text = styled.p`
  margin: 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardImg = styled.img`
  width: 150px;
`;

type FormCardProps = {
  fullName: string;
  birthday: Date;
  srcImg: string;
  gender: string;
  country: string;
  city: string;
  zipCode: string;
};

export const FormCard = ({
  fullName,
  birthday,
  srcImg,
  gender,
  country,
  city,
  zipCode,
}: FormCardProps) => {
  const year = birthday.getFullYear();
  const month = birthday.toLocaleString('en-US', { month: 'short' });
  const day = birthday.toLocaleString('en-US', { day: '2-digit' });

  const firtLetterOfGender = gender.toUpperCase().slice(0, 1);
  return (
    <FormCardWrapper>
      <TextContainer>
        <FullNameTitle data-testid="title-form-card">
          <span className="gender">{firtLetterOfGender === 'M' ? '🤵' : '👩‍💼'}</span>
          {fullName}
        </FullNameTitle>
        <Text data-testid="birthday-form-card">
          📅 {month} {day}, {year}
        </Text>
        <Text data-testid="location-form-card">
          📍 {city}, {country}, {zipCode}
        </Text>
      </TextContainer>
      <div>
        <CardImg data-testid="image-form-card" src={srcImg} alt="" />
      </div>
    </FormCardWrapper>
  );
};
