import { Box, Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import styles from './EditDataModelTable.module.css';
import { useEffect, useState } from 'react';
import { DefaultService, GetDataModelDataframe_Out, UserInfo_Out, UserRole } from 'src/client';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import DataModelColumnCard from '../DataModelColumnCard';
import DataModelSeriesForm from '../DataModelSeriesForm';
import useNotification from 'src/hooks/useNotification';
import { connect } from 'react-redux';

export interface IEditDataModelTable {
  tableData: GetDataModelDataframe_Out;
  refetchDataFrameInfo: () => void;
}

interface IDispatchProps {
  userProfile: any;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#000', 0.1),
  width: '100%'
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
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const EditDataModelTable: React.FC<IEditDataModelTable & IDispatchProps> = ({ tableData, refetchDataFrameInfo, ...props }) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sendNotification] = useNotification();
  const [selectedColumn, setSelectedColumn] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchDataModelSeriesInfo = async () => {
    const res = await DefaultService.getAllDataModelSeriesInfo(tableData.id);
    return res;
  };

  const refetchDataModelSeries = () => {
    fetchDataModelSeriesInfo().then((data) => {
      setColumns(data.data_model_series);
    });
  };

  const handleSuccessfulSave = () => {
    refetchDataFrameInfo();
    sendNotification({
      msg: 'Data Column Added Successfully',
      variant: 'success'
    });
    refetchDataModelSeries();
  };

  const handleEditClicked = (columnData: any) => {
    setSelectedColumn(columnData);
    setOpenModal(true);
  };

  const handleAddNewColumnClicked = () => {
    setSelectedColumn(null);
    setOpenModal(true);
  };

  const handleDeleteClicked = async (columnData: any) => {
    try {
      const res = await DefaultService.deleteDataModelSeries(columnData.id);
      sendNotification({
        msg: 'Data Column Deleted Successfully',
        variant: 'success'
      });
      refetchDataModelSeries();
    } catch (err) {
      sendNotification({
        msg: 'Something went wrong',
        variant: 'error'
      });
    }
  };

  useEffect(() => {
    fetchDataModelSeriesInfo().then((data) => {
      setColumns(data.data_model_series);
    });
  }, [tableData]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredColumns(columns);
    } else {
      const filtered = columns.filter((column) => {
        return (
          column.name.toLowerCase().includes(searchText.toLowerCase()) ||
          column.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredColumns(filtered);
    }
  }, [searchText, columns]);

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Typography variant="h4" component="h4">
        Data Table
      </Typography>
      <Box>
        <Box className={styles.inputContainer}>
          <TextField id="table-name" label="Table Name" variant="outlined" className={styles.input} value={tableData.name} />
          <TextField
            multiline
            rows={2}
            id="description"
            label="Description"
            variant="outlined"
            className={styles.input}
            value={tableData.description}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5">
          Columns
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              flex: 2
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={handleSearchTextChange}
              />
            </Search>
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: 'right',
              marginRight: '1rem'
            }}
          >
            {props.userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) ? (
              <Button variant="contained" color="primary" onClick={handleAddNewColumnClicked}>
                Add Column
              </Button>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '1rem'
        }}
      >
        {filteredColumns.map((column) => {
          return (
            <DataModelColumnCard
              key={column.id}
              columnData={column}
              handleEditClicked={handleEditClicked}
              handleDeleteClicked={handleDeleteClicked}
            />
          );
        })}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <DataModelSeriesForm
          handleCloseModal={handleCloseModal}
          dataModelId={tableData.id}
          handleSuccessfulSave={handleSuccessfulSave}
          selectedColumn={selectedColumn !== null ? selectedColumn : 'new'}
          mode={selectedColumn !== null ? 'edit' : 'new'}
        />
      </Modal>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(EditDataModelTable);
