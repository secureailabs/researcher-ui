import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModelTableSection.module.css';
import { useEffect, useState } from 'react';
import { DataModelDataframe, GetDataModelVersion_Out } from 'src/client';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import EditDataModelTable from '../EditDataModelTable';

export interface IDataModelTableSection {
  dataModelVersion: GetDataModelVersion_Out;
  setDataModelVersion: (dataModelVersion: GetDataModelVersion_Out) => void;
}

const DataModelTableSection: React.FC<IDataModelTableSection> = ({ dataModelVersion, setDataModelVersion }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [rows, setRows] = useState<DataModelDataframe[]>();
  const [selectedRowId, setSelectedRowId] = useState();
  const [selectedTableData, setSelectedTableData] = useState<DataModelDataframe>();

  useEffect(() => {
    setRows(dataModelVersion.dataframes);
  }, [dataModelVersion]);

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
                  const selectedTableData = rows.find((row) => row.id === params.id);
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
      <Typography variant="h3" component="h3">
        {dataModelVersion.name}
      </Typography>

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
        {selectedTableData !== undefined ? (
          <EditDataModelTable dataModelVersion={dataModelVersion} setDataModelVersion={setDataModelVersion} tableData={selectedTableData} />
        ) : null}
      </Drawer>
    </Box>
  );
};

export default DataModelTableSection;
