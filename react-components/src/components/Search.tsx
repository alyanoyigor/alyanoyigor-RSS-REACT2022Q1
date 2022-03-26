import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  font: inherit;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #000;
  width: 100%;
  max-width: 15rem;
`;

export class Search extends React.Component<Record<string, unknown>, { searchValue: string }> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { searchValue: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const savedSeachValue = localStorage.getItem('searchValue');
    if (savedSeachValue) {
      this.setState({
        searchValue: savedSeachValue,
      });
    }
  }

  componentWillUnmount() {
    this.saveValueToLocalStorage(this.state.searchValue);
  }

  saveValueToLocalStorage(value: string) {
    localStorage.setItem('searchValue', value);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <SearchInput
        type="text"
        value={this.state.searchValue}
        onChange={this.handleChange}
        id="search-input"
      />
    );
  }
}
