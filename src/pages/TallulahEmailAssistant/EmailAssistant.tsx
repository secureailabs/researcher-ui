import { Box, Button, InputBase, styled } from '@mui/material';
import styles from './EmailAssistant.module.css';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EmailDisplaySection from './components/EmailDisplaySection';
import Filter from './components/Filter';
import Sort from './components/Sort';
import { GoogleOutlined, WindowsOutlined } from '@ant-design/icons';

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
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ flex: 7, marginRight: '20px' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search by Body, Tags" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <Filter />
            </Box>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <Sort />
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
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              href="https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=5f247444-fff8-42b2-9362-1d2fe5246de1&response_type=code&redirect_uri=https%3A%2F%2F127.0.0.1%3A8000%2Fauthorize&scope=Mail.Read+Mail.Send+User.Read+offline_access+openid+profile"
              startIcon={<WindowsOutlined />}
            >
              Login With Microsoft
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=5f247444-fff8-42b2-9362-1d2fe5246de1&response_type=code&redirect_uri=https%3A%2F%2F127.0.0.1%3A8000%2Fauthorize&scope=Mail.Read+Mail.Send+User.Read+offline_access+openid+profile"
              startIcon={<GoogleOutlined />}
            >
              Login With Google
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EmailAssistant;
