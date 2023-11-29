import { Box, Breadcrumbs, Button, Dialog, IconButton, InputBase, Link, styled } from '@mui/material';
import styles from './TallulahEmailResponseTemplate.module.css';
import TemplateResponseListSection from './components/TemplateResponseListSection';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import EditResponseTemplate from './components/EditResponseTemplate';
import { GetResponseTemplate_Out, ResponseTemplatesService } from 'src/tallulah-ts-client';
import HomeIcon from '@mui/icons-material/Home';

export interface ITallulahEmailResponseTemplate {}

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

const TallulahEmailResponseTemplate: React.FC<ITallulahEmailResponseTemplate> = ({}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isAddNewTemplateDialogOpen, setIsAddNewTemplateDialogOpen] = useState<boolean>(false);
  const [templateList, setTemplateList] = useState<GetResponseTemplate_Out[]>([]);

  const fetchResponseTemplates = async () => {
    try {
      const response = await ResponseTemplatesService.getAllResponseTemplates();
      setTemplateList(response.templates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResponseTemplates();
  }, []);

  const handleRefresh = () => {
    console.log('handleRefresh');
    setTemplateList([]);
    fetchResponseTemplates();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <Box sx={{ flex: 1, marginRight: '20px' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search by Name ..." inputProps={{ 'aria-label': 'search' }} value={searchText} />
            {searchText !== '' ? (
              <IconButton aria-label="delete">
                <CloseIcon />
              </IconButton>
            ) : null}
          </Search>
        </Box>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => {
            setIsAddNewTemplateDialogOpen(true);
          }}
        >
          Add New Template
        </Button>
      </Box>
      <Box>
        <TemplateResponseListSection templateList={templateList} handleRefresh={handleRefresh} />
      </Box>
      <Dialog
        open={isAddNewTemplateDialogOpen}
        onClose={() => {
          setIsAddNewTemplateDialogOpen(false);
        }}
        fullWidth
      >
        <EditResponseTemplate setIsModalOpen={setIsAddNewTemplateDialogOpen} handleRefresh={handleRefresh} />
      </Dialog>
    </Box>
  );
};

export default TallulahEmailResponseTemplate;
