import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import styles from './EditDataModelTable.module.css';
import { useEffect, useState } from 'react';
import {
  DataModelDataframe,
  DataModelSeries,
  DataModelVersionState,
  GetDataModelVersion_Out,
  SeriesDataModelType,
  UserRole
} from 'src/client';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import DataModelColumnCard from '../DataModelColumnCard';
import DataModelSeriesForm from '../DataModelSeriesForm';
import useNotification from 'src/hooks/useNotification';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

export interface IEditDataModelTable {
  dataModelVersion: GetDataModelVersion_Out;
  setDataModelVersion: (dataModelVersion: GetDataModelVersion_Out) => void;
  tableData: DataModelDataframe;
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

const EditDataModelTable: React.FC<IEditDataModelTable & IDispatchProps> = ({
  dataModelVersion,
  setDataModelVersion,
  tableData,
  userProfile
}) => {
  const [columns, setColumns] = useState<DataModelSeries[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sendNotification] = useNotification();
  const [selectedColumn, setSelectedColumn] = useState<DataModelSeries | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchDataModelSeriesInfo = async () => {
    return tableData;
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
      const currentDataModelDataframe = dataModelVersion.dataframes.find((df) => df.id === tableData.id);
      if (currentDataModelDataframe === undefined || currentDataModelDataframe.series === undefined) {
        return;
      }

      const newSeries = currentDataModelDataframe.series.filter((s) => s.id !== columnData.id);
      currentDataModelDataframe.series = newSeries;

      // Update the data model version with the new data model dataframe
      const newDataModelVersion = {
        ...dataModelVersion,
        dataframes: dataModelVersion.dataframes.map((df) => {
          if (df.id === tableData.id) {
            return currentDataModelDataframe;
          }
          return df;
        })
      };

      // Update the data model version in the state
      console.log('deleteDataModelVersion', newDataModelVersion);
      setDataModelVersion(newDataModelVersion);

      sendNotification({
        msg: 'Data Column Deleted Successfully',
        variant: 'success'
      });
    } catch (err) {
      sendNotification({
        msg: 'Something went wrong',
        variant: 'error'
      });
    }
  };

  useEffect(() => {
    fetchDataModelSeriesInfo().then((data) => {
      if (data.series === undefined) {
        return;
      }
      setColumns(data.series);
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
            {(userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) || userProfile.roles.includes(UserRole.SAIL_ADMIN)) &&
            dataModelVersion.state === DataModelVersionState.DRAFT &&
            userProfile.id === dataModelVersion.user_id ? (
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
              dataModelVersion={dataModelVersion}
              setDataModelVersion={setDataModelVersion}
              handleEditClicked={handleEditClicked}
              handleDeleteClicked={handleDeleteClicked}
            />
          );
        })}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        {tableData.id ? (
          <DataModelSeriesForm
            handleCloseModal={handleCloseModal}
            dataModelDataframeId={tableData.id}
            dataModelVersion={dataModelVersion}
            setDataModelVersion={setDataModelVersion}
            selectedColumn={
              selectedColumn !== null
                ? selectedColumn
                : {
                    id: uuid(),
                    name: '',
                    description: '',
                    series_schema: {
                      type: SeriesDataModelType.SERIES_DATA_MODEL_CATEGORICAL
                    }
                  }
            }
            mode={selectedColumn !== null ? 'edit' : 'new'}
          />
        ) : (
          <> </>
        )}
      </Modal>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(EditDataModelTable);
