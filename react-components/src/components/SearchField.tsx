import React, { ChangeEvent } from 'react';
import { SearchInput } from './StyledInput';

export class SearchField extends React.Component<Record<string, unknown>, { searchValue: string }> {
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
