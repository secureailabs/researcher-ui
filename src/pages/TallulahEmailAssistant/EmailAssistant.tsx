import { Box, Button, InputBase, styled } from '@mui/material';
import styles from './EmailAssistant.module.css';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EmailDisplaySection from './components/EmailDisplaySection';

export interface IEmailAssistant {
  sampleTextProp: string;
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

const EmailAssistant: React.FC<IEmailAssistant> = ({ sampleTextProp }) => {
  const [isMailAdded, setIsMailAdded] = useState(true);

  return (
    <>
      {isMailAdded ? (
        <Box>
          <Box
            sx={{
              marginTop: '2rem',
              marginBottom: '4rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ flex: 1, marginRight: '20px' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search by Body, Tags" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>
          </Box>
          <Box>
            <EmailDisplaySection />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 auto'
          }}
        >
          <Box>No mails added yet. Please add a mail.</Box>
          <Box
            sx={{
              marginTop: '20px'
            }}
          >
            <Button variant="contained" color="primary">
              Add Mail
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EmailAssistant;
