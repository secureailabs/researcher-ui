import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import styles from './TallulahSearch.module.css';
import { useEffect, useState } from 'react';
import SAMPLE_DATA from './sample_search';
import PatientCard from './components/PatientCard';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PatientDetailViewModal from './components/PatientDetailViewModal';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const storyUsedOptions = [
  {
    label: 'Least',
    value: [0, 3]
  },
  {
    label: 'Moderate (4-7)',
    value: [4, 7]
  },
  {
    label: 'Many (>8)',
    value: [8, 2000000000]
  }
];

export interface ITallulahSearch {
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

const TallulahSearch: React.FC<ITallulahSearch> = ({ sampleTextProp }) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPatientData, setSelectedPatientData] = useState<any>(null);

  const [storyUsedFilter, setStoryUsedFilter] = useState<any[]>([]);

  const handleFilterChange = (event: SelectChangeEvent<typeof storyUsedFilter>) => {
    const {
      target: { value }
    } = event;

    setStoryUsedFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );

    // match value with storyUsedOptions and store the value in valueArray
    const valueArray: any[] = [];
    if (typeof value !== 'string') {
      value.forEach((val: any) => {
        storyUsedOptions.forEach((option) => {
          if (option.label === val) {
            valueArray.push(option.value);
          }
        });
      });
    }

    // valueArray is like [[0,3], [4,6], [7,2000000000]]
    // based on above filter the filteredData such that storyUsed is between the range of any of the valueArray
    let filteredDataTemp = SAMPLE_DATA.filter((data: any) => {
      let isDataValid = false;
      valueArray.forEach((val: any) => {
        if (data._source.storyUsed >= val[0] && data._source.storyUsed <= val[1]) {
          isDataValid = true;
        }
      });
      return isDataValid;
    });

    if (valueArray.length === 0) {
      filteredDataTemp = SAMPLE_DATA;
    }

    const filteredDataTemp2 = filteredDataTemp.filter((data: any) => {
      return (
        data._source.Name.toLowerCase().includes(searchText.toLowerCase()) ||
        data._source['Life Story'].toLowerCase().includes(searchText.toLowerCase()) ||
        data._source.Tags.join(' ').toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilteredData(filteredDataTemp2);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setFilteredData(SAMPLE_DATA);
  }, []);

  const handleSearchChange = (event: any) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    const valueArray: any[] = [];
    if (typeof storyUsedFilter !== 'string') {
      storyUsedFilter.forEach((val: any) => {
        storyUsedOptions.forEach((option) => {
          if (option.label === val) {
            valueArray.push(option.value);
          }
        });
      });
    }

    let filteredDataTemp = SAMPLE_DATA.filter((data: any) => {
      let isDataValid = false;
      valueArray.forEach((val: any) => {
        if (data._source.storyUsed >= val[0] && data._source.storyUsed <= val[1]) {
          isDataValid = true;
        }
      });
      return isDataValid;
    });

    if (valueArray.length === 0) {
      filteredDataTemp = SAMPLE_DATA;
    }

    const filteredDataTemp2 = filteredDataTemp.filter((data: any) => {
      return (
        data._source.Name.toLowerCase().includes(searchText.toLowerCase()) ||
        data._source['Life Story'].toLowerCase().includes(searchText.toLowerCase()) ||
        data._source.Tags.join(' ').toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filteredDataTemp2);
  };

  return (
    <Box className={styles.container}>
      <Box>
        <img src={require(`src/assets/images/map-2.png`)} alt="Patient Image" className={styles.mapImage} />
      </Box>
      {/* Search Box area */}
      <Box>
        <Box
          sx={{
            marginTop: '4rem',
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
              <StyledInputBase
                placeholder="Search by Name, Tags, Lifestory ..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={handleSearchChange}
              />
              {searchText !== '' ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setSearchText('');
                    setFilteredData(SAMPLE_DATA);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Search>
          </Box>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={3}>
          {filteredData.map((patientData: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              onClick={() => {
                setOpenModal(true);
                setSelectedPatientData(patientData);
              }}
              className={styles.patientCardGridItem}
            >
              <PatientCard data={patientData} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {selectedPatientData ? (
        <PatientDetailViewModal openModal={openModal} handleCloseModal={handleCloseModal} data={selectedPatientData} />
      ) : null}
    </Box>
  );
};

export default TallulahSearch;
