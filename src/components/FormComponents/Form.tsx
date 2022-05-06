import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateMovieInputs } from '../../types/types';
import { addFormCardAction } from '../../store/appSlice';
import { Input } from './Input';
import { SelectCountry } from './SelectCountry';
import { SelectCity } from './SelectCity';
import { styledField } from './styledField';
import { formSchema } from '../../validation/validation';
import { useDispatch } from 'react-redux';

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 450px;
  margin: 0 auto;
`;

const SubmitBtn = styled.input`
  ${styledField};
  padding: 16px;
  border-radius: 24px;
  cursor: pointer;
  border: none;
  background-color: #0a0a0a;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  transition: all 1s;
  &:hover {
    box-shadow: 5px 5px 25px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMovieInputs>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const [countryId, setCountryId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleFormSubmit = (data: CreateMovieInputs) => {
    dispatch(addFormCardAction(data));
    reset();
  };
  return (
    <CustomForm onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        dataTestId="inputTitle"
        inputName="title"
        inputData={[{ labelValue: 'Movie title', placeholder: 'Spider Man' }]}
        register={register}
        errors={errors}
      />
      <Input
        dataTestId="inputPoster"
        inputData={[{ labelValue: 'Movie poster' }]}
        inputName="poster"
        inputType="file"
        register={register}
        errors={errors}
      />
      <Input
        dataTestId="inputDate"
        inputName="releaseDate"
        inputType="date"
        inputData={[{ labelValue: 'Release date' }]}
        register={register}
        errors={errors}
      />
      <Input
        dataTestId="inputAmount"
        inputName="budget"
        inputType="number"
        inputData={[{ labelValue: 'Budget ($)', placeholder: '1000000' }]}
        register={register}
        errors={errors}
      />
      <Input
        dataTestId="inputRadio"
        inputName="audience"
        inputType="radio"
        inputTitle="Movie audience"
        inputData={[
          { labelValue: 'Local', inputValue: 'local', inputId: 'local' },
          {
            labelValue: 'Local, partly global',
            inputValue: 'global-partly',
            inputId: 'global-partly',
          },
          { labelValue: 'Global', inputValue: 'global', inputId: 'global' },
        ]}
        register={register}
        errors={errors}
      />
      <SelectCountry
        onSelectCountryChange={setCountryId}
        errors={errors}
        register={register}
        inputName="country"
      />
      <SelectCity countryId={countryId} errors={errors} register={register} inputName="city" />
      <Input
        dataTestId="checkboxPrivacy"
        inputName="privacyCheckbox"
        inputType="checkbox"
        inputData={[{ labelValue: 'I Agree to Privacy Policy' }]}
        register={register}
        errors={errors}
      />
      <SubmitBtn data-testid="submit" type="submit" />
    </CustomForm>
  );
};
