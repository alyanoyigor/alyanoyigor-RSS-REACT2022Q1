import React from 'react';
import { StyledInput } from '../StyledInput';
import { FormBlock } from './FormBlock';
import { InputControl } from './InputControl';
import { SelectCity } from './SelectCity';
import { SelectCountry } from './SelectCountry';

export class FormLocation extends React.Component<
  Record<string, unknown>,
  { countryId: number | null }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { countryId: null };
  }

  changeCountry(countryId: number) {
    this.setState((prevState) => ({ ...prevState, countryId }));
  }

  render() {
    return (
      <FormBlock title="Location Info">
        <InputControl maxWidth={10} labelValue="Country">
          <SelectCountry onSelectCountryChange={this.changeCountry.bind(this)} />
        </InputControl>
        <InputControl maxWidth={10} labelValue="City">
          <SelectCity countryId={this.state.countryId} />
        </InputControl>
        <InputControl maxWidth={20} labelValue="Zip code">
          <StyledInput type="tel" min="0" placeholder="#####" pattern="[0-9]{5}" required />
        </InputControl>
      </FormBlock>
    );
  }
}
