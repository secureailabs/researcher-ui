import { Box, Button, Dialog, Drawer, IconButton, InputBase, styled } from '@mui/material';
import styles from './EmailAssistant.module.css';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailDisplaySection from './components/EmailDisplaySection';
import Filter from './components/Filter';
import Sort from './components/Sort';
import { GoogleOutlined, WindowsOutlined } from '@ant-design/icons';
import { MailboxService } from 'src/tallulah-ts-client';
import { OUTLOOK_REDIRECT_URI } from 'src/config';
import { useNavigate } from 'react-router-dom';
import { GridSelectionModel } from '@mui/x-data-grid';
import EmailReply from './components/EmailReply';

const urlToEncodded = (url: string) => {
  const encodedURL = encodeURIComponent(url);
  const URL = `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=5f247444-fff8-42b2-9362-1d2fe5246de1&response_type=code&redirect_uri=${encodedURL}&scope=Mail.Read+Mail.Send+User.Read+offline_access+openid+profile`;
  return URL;
};

export interface IEmailAssistant {}

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

const EmailAssistant: React.FC<IEmailAssistant> = ({}) => {
  const [isMailAdded, setIsMailAdded] = useState(false);
  const [mailboxes, setMailboxes] = useState<any[]>([]);
  const [selectedEmailsIds, setselectedEmailsIds] = useState<string[]>([]);
  const [openReplyModal, setOpenReplyModal] = useState<boolean>(false);
  const [mailBoxId, setMailBoxId] = useState<string>('');

  const navigate = useNavigate();

  const getAllMailBoxes = async () => {
    try {
      const response = await MailboxService.getAllMailboxes();
      if (response.mailboxes.length > 0) {
        setIsMailAdded(true);
        setMailboxes(response.mailboxes);
        setMailBoxId(response.mailboxes[0]._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllMailBoxes();
  }, []);

  return (
    <>
      {isMailAdded ? (
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: '60px',
              backgroundColor: '#f5f5f5',
              zIndex: 1,
              paddingTop: '20px',
              paddingBottom: '20px',
              boxShadow: '0px 3px 0px rgba(0, 0, 0, 0.02)',
              borderBottom: '1px solid #e3e3e3'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px'
              }}
            >
              {/* NOTE: Search boxes commented */}
              {/* <Box sx={{ flex: 7, marginRight: '20px' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search by Body, Tags" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box> */}
              <Box></Box>
              <Box sx={{ display: 'flex' }}>
                <Filter />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Sort />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  onClick={() => {
                    navigate('/email-assistant/response-template');
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
            {selectedEmailsIds.length > 0 ? (
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenReplyModal(true);
                  }}
                >
                  Reply Selected
                </Button>
              </Box>
            ) : null}
          </Box>
          <Box>
            {mailboxes.length > 0 ? (
              <EmailDisplaySection mailboxes={mailboxes} selectionModel={selectedEmailsIds} setSelectionModel={setselectedEmailsIds} />
            ) : null}
          </Box>
          <Dialog
            open={openReplyModal}
            onClose={() => {
              setOpenReplyModal(false);
            }}
          >
            <EmailReply setOpenReplyModal={setOpenReplyModal} selectedEmailsIds={selectedEmailsIds} mailBoxId={mailBoxId} />
          </Dialog>
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
            <Button variant="contained" color="primary" href={urlToEncodded(OUTLOOK_REDIRECT_URI)} startIcon={<WindowsOutlined />}>
              Login With Microsoft
            </Button>
            <Button variant="contained" color="primary" href="#" startIcon={<GoogleOutlined />}>
              Login With Google
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EmailAssistant;
