import React from 'react';
import styled from 'styled-components';
import { StyledInput } from '../StyledInput';
import { InputControl } from './InputControl';
import { SelectCity } from './SelectCity';
import { SelectCountry } from './SelectCountry';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
      <div>
        <h3>Location</h3>
        <SelectWrapper>
          <div>
            <SelectCountry onSelectCountryChange={this.changeCountry.bind(this)} />
          </div>
          <div>
            <SelectCity countryId={this.state.countryId} />
          </div>
          <InputControl labelValue="Zip code">
            <StyledInput type="tel" min="0" placeholder="#####" pattern="[0-9]{5}" required />
          </InputControl>
        </SelectWrapper>
      </div>
    );
  }
}
