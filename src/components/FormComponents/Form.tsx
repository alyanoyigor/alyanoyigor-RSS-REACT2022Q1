import React, { useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppContextData, CreateMovieInputs } from '../../types/types';
import { Input } from './Input';
import { SelectCountry } from './SelectCountry';
import { SelectCity } from './SelectCity';
import { styledField } from './styledField';

const requiredText = 'This field is required';
const transformField = (curr: string, orig: string) => (orig === '' ? null : curr);

const schema = yup
  .object({
    title: yup
      .string()
      .required(requiredText)
      .min(2, 'This field must have 2 characters minimum')
      .max(30, 'This field must have 30 characters maximum'),
    releaseDate: yup
      .date()
      .nullable()
      .transform(transformField)
      .max(new Date(), 'Release date must be before current date')
      .required(requiredText),
    country: yup.string().required(requiredText),
    privacyCheckbox: yup.boolean().oneOf([true], requiredText),
    city: yup.string().nullable().transform(transformField).required(requiredText),
    poster: yup
      .mixed()
      .test('fileType', 'The file must be jpg, png, svg or gif formats', (value: FileList) => {
        if (value[0]?.type) {
          const acceptExts = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif', 'image/jpg'];
          return acceptExts.some((ext) => ext === value[0].type);
        }
        return true;
      }),
    budget: yup.number().nullable().transform(transformField).required(requiredText),
    audience: yup.string().nullable().required(requiredText),
  })
  .required();

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

export const Form = ({ context }: { context: AppContextData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMovieInputs>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [countryId, setCountryId] = useState<number | null>(null);

  const handleFormSubmit = (data: CreateMovieInputs) => {
    context.dispatchAppState({ type: 'ADD_FORM_CARD', payload: data });
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
