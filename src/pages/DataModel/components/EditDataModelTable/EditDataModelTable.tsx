import { Box, Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import styles from './EditDataModelTable.module.css';
import { useEffect, useState } from 'react';
import { DefaultService } from 'src/client';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import DataModelColumnCard from '../DataModelColumnCard';
import DataModelSeriesForm from '../DataModelSeriesForm';
import useNotification from 'src/hooks/useNotification';

export interface IEditDataModelTable {
  tableData: any;
  refetchDataFrameInfo: () => void;
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

const EditDataModelTable: React.FC<IEditDataModelTable> = ({ tableData, refetchDataFrameInfo }) => {
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

  const fetchDataModelSeriesInfo = async (ids: string[]) => {
    const promises = ids.map((id) => {
      return DefaultService.getDataModelSeriesInfo(id);
    });
    const res = await Promise.all(promises);
    return res;
  };

  const handleSuccessfulSave = () => {
    refetchDataFrameInfo();
    sendNotification({
      msg: 'Data Column Added Successfully',
      variant: 'success'
    });
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
      const requestBody = {
        data_model_series_to_remove: [columnData.id]
      };
      const res2 = await DefaultService.updateDataModelDataframe(tableData.id, requestBody);
      sendNotification({
        msg: 'Data Column Deleted Successfully',
        variant: 'success'
      });
      refetchDataFrameInfo();
    } catch (err) {
      sendNotification({
        msg: 'Something went wrong',
        variant: 'error'
      });
    }
  };

  useEffect(() => {
    const series_ids = tableData.data_model_series;
    fetchDataModelSeriesInfo(series_ids).then((data) => {
      setColumns(data);
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
            <Button variant="contained" color="primary" onClick={handleAddNewColumnClicked}>
              Add Column
            </Button>
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

export default EditDataModelTable;
