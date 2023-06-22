import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModelTableSection.module.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { DefaultService } from 'src/client';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import EditDataModelTable from '../EditDataModelTable';

export interface IDataModelTableSection {
  data: any;
  refetchDataModelTables: () => void;
}

const DataModelTableSection: React.FC<IDataModelTableSection> = ({ data, refetchDataModelTables }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [selectedTableData, setSelectedTableData] = useState<any>(null);

  const fetchDataFrameInfo = async (dataModelFramesId: string[]) => {
    const promises = dataModelFramesId.map((id) => {
      return DefaultService.getDataModelDataframeInfo(id);
    });

    const dataFrameInfo = await Promise.all(promises);
    return dataFrameInfo;
  };

  const dataModelFramesIds = data.data_model_dataframes;

  const {
    data: rows,
    isLoading,
    isError,
    refetch: refetchDataFrameInfo
  } = useQuery('dataFrameInfo', () => fetchDataFrameInfo(dataModelFramesIds));

  const tableColumns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'table--header',
      valueGetter: (params: any) => {
        return params.row.name ? params.row.name : '--';
      },
      flex: 2
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
    },
    {
      field: 'action',
      flex: 1,
      headerName: 'Action',
      headerClassName: 'table--header',
      renderCell: (params: any) => {
        return (
          <>
            {rows && rows.length > 0 ? (
              <Button
                variant="text"
                onClick={() => {
                  setSelectedRowId(params.row.id);
                  const selectedTableData = rows.find((row) => row.id === params.row.id);
                  setSelectedTableData(selectedTableData);
                  setOpenDrawer(true);
                }}
              >
                View Columns
              </Button>
            ) : null}
          </>
        );
      }
    }
  ];

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Typography variant="body1" component="p" className={styles.rightAlign}>
          <span className={styles.title}>Created At : </span> {data.creation_time}
        </Typography>
      </Box>
      {rows && rows.length > 0 ? (
        <Box className={styles.tableContainer}>
          <AppStripedDataGrid
            autoHeight
            rows={rows}
            columns={tableColumns}
            getRowId={(row: any) => row.id}
            rowsPerPageOptions={[25]}
            selectionModel={selectedRowId}
            onSelectionModelChange={(selected: any) => {
              setSelectedRowId(selected);
              setOpenDrawer(true);
            }}
          />
        </Box>
      ) : null}

      {/* Right sidebar to display column infos */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '50%', padding: '20px 0 0 20px' }
        }}
      >
        <EditDataModelTable tableData={selectedTableData} refetchDataFrameInfo={refetchDataFrameInfo} />
      </Drawer>
    </Box>
  );
};

export default DataModelTableSection;
