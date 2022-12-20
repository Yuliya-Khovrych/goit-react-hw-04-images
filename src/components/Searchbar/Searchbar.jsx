import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error(
        'The search string cannot be empty. Please specify your search query.'
      );
    }
    onSubmit(searchQuery);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={20} />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
