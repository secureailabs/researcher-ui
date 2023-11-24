import { Box, Button, Dialog, Drawer, Icon, IconButton, InputBase, Menu, MenuItem, styled } from '@mui/material';
import styles from './EmailAssistant.module.css';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailDisplaySection from './components/EmailDisplaySection';
import Filter from './components/Filter';
import Sort from './components/Sort';
import { GoogleOutlined, WindowsOutlined } from '@ant-design/icons';
import { GetMailbox_Out, MailboxService } from 'src/tallulah-ts-client';
import { OUTLOOK_REDIRECT_URI } from 'src/config';
import { useNavigate } from 'react-router-dom';
import { GridSelectionModel } from '@mui/x-data-grid';
import EmailReply from './components/EmailReply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterChip from './components/FilterChip';

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
  const [selectedEmails, setSelectedEmails] = useState<any[]>([]);
  const [openReplyModal, setOpenReplyModal] = useState<boolean>(false);
  const [selectedMailBoxId, setselectedMailBoxId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortKey, setSortKey] = useState<string>('received_time');
  const [sortDirection, setSortDirection] = useState<-1 | 1>(-1);
  const [filterByTags, setFilterByTags] = useState<string[]>([]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const getAllMailBoxes = async () => {
    try {
      const response = await MailboxService.getAllMailboxes();
      if (response.mailboxes.length > 0) {
        setIsMailAdded(true);
        setMailboxes(response.mailboxes);
        setselectedMailBoxId(response.mailboxes[0]._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveMailBoxClicked = async () => {
    if (!selectedMailBoxId) return;
    try {
      const response = await MailboxService.deleteMailbox(selectedMailBoxId);
      setIsMailAdded(false);
      setMailboxes([]);
      setselectedMailBoxId(null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllMailBoxes();
  }, []);

  useEffect(() => {
    getAllMailBoxes();
  }, [sortDirection]);

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
                justifyContent: 'space-between',
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

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '20px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Filter filters={filterByTags} setFilters={setFilterByTags} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Sort sortDirection={sortDirection} setSortDirection={setSortDirection} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '20px'
                }}
              >
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
                <Box sx={{ display: 'flex' }}>
                  <IconButton
                    onClick={() => {
                      navigate('/email-assistant/response-template');
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Box>
                {/* dropdown menu */}
                <Box>
                  <IconButton
                    id="menu-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={handleRemoveMailBoxClicked}>Remove Mailbox</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: '20px'
              }}
            >
              {filterByTags.map((tag) => (
                <FilterChip filterTag={tag} setFilters={setFilterByTags} />
              ))}
            </Box>
          </Box>
          <Box>
            {selectedMailBoxId ? (
              <EmailDisplaySection
                mailBoxId={selectedMailBoxId}
                selectionModel={selectedEmailsIds}
                setSelectionModel={setselectedEmailsIds}
                sortKey={sortKey}
                sortDirection={sortDirection}
                filterByTags={filterByTags}
              />
            ) : null}
          </Box>
          {/* Modal for email response */}
          <Dialog
            open={openReplyModal}
            onClose={() => {
              setOpenReplyModal(false);
            }}
            fullWidth
          >
            <EmailReply
              setOpenReplyModal={setOpenReplyModal}
              selectedEmailsIds={selectedEmailsIds}
              mailBoxId={selectedMailBoxId as string}
            />
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
