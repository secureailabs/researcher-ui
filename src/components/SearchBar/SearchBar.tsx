import { Box, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from './SearchBar.module.css';

export interface ISearchBar {
  placeholder?: string;
  searchText: string;
  handleSearchChange: (text: string) => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  width: '100%',
  border: '1px solid #d1d1d1',
  height: '50px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    }
  }
}));

const SearchBar: React.FC<ISearchBar> = ({ placeholder, searchText, handleSearchChange }) => {
  return (
    <Box sx={{ flex: 1, marginRight: '20px' }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder ? placeholder : 'Search…'}
          inputProps={{ 'aria-label': 'search' }}
          value={searchText}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
        />
        {searchText !== '' ? (
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleSearchChange('');
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Search>
    </Box>
  );
};

export default SearchBar;
