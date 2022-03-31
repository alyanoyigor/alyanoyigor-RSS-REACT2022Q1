import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/svg/search.svg';
import { StyledInput } from './StyledInput';

const SearchInput = styled(StyledInput)`
  background: url(${SearchIcon}) no-repeat scroll 0.5rem 0.5rem;
  background-size: 1.2rem;
  padding-left: 2.5rem;
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
    this.saveValueToLocalStorage(event.target.value);
  }

  render() {
    return (
      <SearchInput
        type="text"
        placeholder="Search..."
        value={this.state.searchValue}
        onChange={this.handleChange}
        role="search"
      />
    );
  }
}
