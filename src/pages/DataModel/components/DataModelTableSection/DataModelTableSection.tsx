import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModelTableSection.module.css';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { DefaultService } from 'src/client';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import AddNewDataModel from '../AddNewDataModel';
import EditDataModelTable from '../EditDataModelTable';

export interface IDataModelTableSection {
  data: any;
}

const DataModelTableSection: React.FC<IDataModelTableSection> = ({ data }) => {
  const [rows, setRows] = useState<any[]>([]);
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

  useEffect(() => {
    const dataModelFramesIds = data.data_model_dataframes;
    fetchDataFrameInfo(dataModelFramesIds).then((data) => {
      setRows(data);
    });
  }, [data]);

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
          </>
        );
      }
    }
  ];

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}
      >
        <Typography variant="body1" component="p">
          <span className={styles.title}>Name : </span>
          {data.name}
        </Typography>
        <Typography variant="body1" component="p" className={styles.rightAlign}>
          <span className={styles.title}>Created At : </span> {data.creation_time}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={styles.title}>Description : </span> {data.description}
        </Typography>
      </Box>
      {rows.length > 0 ? (
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
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '50%', padding: '20px 0 0 20px' }
        }}
      >
        <EditDataModelTable tableData={selectedTableData} />
      </Drawer>
    </Box>
  );
};

export default DataModelTableSection;
