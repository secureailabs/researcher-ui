import { Box, TextField, Typography } from '@mui/material';
import styles from './EditDataModelTable.module.css';
import { useEffect, useState } from 'react';
import { DefaultService } from 'src/client';
import DataModelColumnCard from '../DataModelColumnCard';

export interface IEditDataModelTable {
  tableData: any;
}

const EditDataModelTable: React.FC<IEditDataModelTable> = ({ tableData }) => {
  console.log('tableData', tableData);
  const [columns, setColumns] = useState<any[]>([]);

  const fetchDataModelSeriesInfo = async (ids: string[]) => {
    const promises = ids.map((id) => {
      return DefaultService.getDataModelSeriesInfo(id);
    });
    const res = await Promise.all(promises);
    return res;
  };

  useEffect(() => {
    const series_ids = tableData.data_model_series;
    fetchDataModelSeriesInfo(series_ids).then((data) => {
      setColumns(data);
    });
  }, [tableData]);

  console.log('columns', columns);

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Typography variant="h4" component="h4">
        Add New Data Model
      </Typography>
      <Box>
        <Box className={styles.inputContainer}>
          <TextField id="table-name" label="Table Name" variant="outlined" className={styles.input} />
          <TextField multiline rows={2} id="description" label="Description" variant="outlined" className={styles.input} />
        </Box>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" component="h5">
          Columns
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '1rem'
        }}
      >
        {columns.map((column) => {
          return <DataModelColumnCard key={column.id} columnData={column} />;
        })}
      </Box>
    </Box>
  );
};

export default EditDataModelTable;
