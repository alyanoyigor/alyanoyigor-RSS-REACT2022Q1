import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  font: inherit;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 20rem;
  max-width: 100%;
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
      <div>
        <SearchInput type="text" value={this.state.searchValue} onChange={this.handleChange} />
      </div>
    );
  }
}
