import React from 'react';
import { SearchInput } from './StyledInput';

export class SearchField extends React.Component<
  { onSubmitMovie: (value: string) => void },
  { searchValue: string }
> {
  constructor(props: { onSubmitMovie: (value: string) => void }) {
    super(props);
    this.state = { searchValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      this.setState({
        searchValue: savedSearchValue,
      });
    }
  }

  componentWillUnmount() {
    this.saveValueToLocalStorage(this.state.searchValue);
  }

  saveValueToLocalStorage(value: string) {
    localStorage.setItem('searchValue', value);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    this.setState({ searchValue });
    this.saveValueToLocalStorage(searchValue);
  }

  handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (event.target instanceof HTMLInputElement) {
        this.props.onSubmitMovie(event.target.value);
      }
    }
  }

  render() {
    return (
      <SearchInput
        type="text"
        placeholder="Search..."
        value={this.state.searchValue}
        onChange={this.handleChange}
        onKeyDown={this.handleSearch}
        role="search"
      />
    );
  }
}
