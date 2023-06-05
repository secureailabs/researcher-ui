import { Box, Typography } from '@mui/material';
import styles from './DataModelTableSection.module.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ApiError, DataModelDataframeState, DefaultService, GetDataModelDataframe_Out } from 'src/client';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';

export interface IDataModelTableSection {
  data: any;
}

const DataModelTableSection: React.FC<IDataModelTableSection> = ({ data }) => {
  const [rows, setRows] = useState<any[]>([]);

  const fetchDataFrameInfo = async (dataModelFramesId: string[]) => {
    const promises = dataModelFramesId.map((id) => {
      return DefaultService.getDataModelDataframeInfo(id);
    });

    const dataFrameInfo = await Promise.all(promises);
    return dataFrameInfo;
  };

  useEffect(() => {
    const dataModelFramesIds = data.data_model_dataframes;
    fetchDataFrameInfo(dataModelFramesIds).then((data) => {
      setRows(data);
    });
    // if (data) {
    //   const rows = data.dataModelInfo.map((item: any) => {
    //     return {
    //       id: item.id,
    //       name: item.name,
    //       description: item.description,
    //       createdAt: item.createdAt,
    //       updatedAt: item.updatedAt
    //     };
    //   });
    // }
  }, [data]);

  const tableColumns = [
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params: any) => {
        return params.row.name ? params.row.name : '--';
      },
      flex: 2,
      headerClassName: 'table--header'
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      headerClassName: 'table--header',
      valueGetter: (params: any) => {
        return params.row?.description ? params.row?.description : '--';
      }
    },
    {
      field: 'Created at',
      flex: 2,
      headerName: 'Created at',
      headerClassName: 'table--header',
      valueGetter: (params: any) => {
        return params.row?.creation_time ? `${params.row?.creation_time}` : '--';
      }
    }
  ];

  return (
    <Box className={styles.container}>
      {/* <AppStripedDataGrid autoHeight rows={rows} columns={getTableColumn()} getRowId={(row) => row.id} rowsPerPageOptions={[20, 50, 100]} /> */}
      <Box>
        <Typography variant="body1" component="p">
          <span className={styles.title}>Name : </span>
          {data.name}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={styles.title}>Description : </span> {data.description}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={styles.title}>Created At : </span> {data.creation_time}
        </Typography>
      </Box>
      {rows.length > 0 ? (
        <Box className={styles.tableContainer}>
          <AppStripedDataGrid autoHeight rows={rows} columns={tableColumns} getRowId={(row: any) => row.id} rowsPerPageOptions={[25]} />
        </Box>
      ) : null}
    </Box>
  );
};

export default DataModelTableSection;
