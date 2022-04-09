import React, { RefObject } from 'react';
import { FormBlock } from './FormBlock';
import { InputControl } from './InputControl';
import { InputZipCode } from './InputZipCode';
import { SelectCity } from './SelectCity';
import { SelectCountry } from './SelectCountry';

type FormLocationProps = {
  countrySelect: RefObject<HTMLSelectElement>;
  countrySelectErrorMessage: string;
  isValidCountrySelect: boolean;
  citySelect: RefObject<HTMLSelectElement>;
  citySelectErrorMessage: string;
  isValidCitySelect: boolean;
  zipCodeInput: RefObject<HTMLInputElement>;
  zipCodeInputErrorMessage: string;
  isValidInputZipCode: boolean;
};

export class FormLocation extends React.Component<FormLocationProps, { countryId: number | null }> {
  constructor(props: FormLocationProps) {
    super(props);
    this.state = { countryId: null };
  }

  changeCountry(countryId: number) {
    this.setState((prevState) => ({ ...prevState, countryId }));
  }

  render() {
    return (
      <FormBlock title="Location Info">
        <InputControl
          errorMessage={this.props.countrySelectErrorMessage}
          testErrorId="countryError"
          isValid={this.props.isValidCountrySelect}
          maxWidth={10}
          labelValue="Country"
        >
          <SelectCountry
            onSelectCountryChange={this.changeCountry.bind(this)}
            countrySelect={this.props.countrySelect}
          />
        </InputControl>
        <InputControl
          errorMessage={this.props.citySelectErrorMessage}
          testErrorId="cityError"
          isValid={this.props.isValidCitySelect}
          maxWidth={10}
          labelValue="City"
        >
          <SelectCity countryId={this.state.countryId} citySelect={this.props.citySelect} />
        </InputControl>
        <InputZipCode
          errorMessage={this.props.zipCodeInputErrorMessage}
          isValid={this.props.isValidInputZipCode}
          refInput={this.props.zipCodeInput}
        />
      </FormBlock>
    );
  }
}
