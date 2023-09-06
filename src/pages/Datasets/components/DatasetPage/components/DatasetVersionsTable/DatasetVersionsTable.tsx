import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GetMultipleDatasetVersion_Out, ApiError, DefaultService } from 'src/client';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import styles from './DatasetVersionsTable.module.css';
import { useNavigate } from 'react-router-dom';

export interface IDatasetVersionsTable {
  data: GetMultipleDatasetVersion_Out;
}

const DatasetVersionsTable: React.FC<IDatasetVersionsTable> = ({ data }) => {
  const [rows, setRows] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data?.dataset_versions);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'table--header',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row.name ? params.row.name : '--';
      }
    },
    {
      field: 'creation_time',
      headerClassName: 'table--header',
      headerName: 'Publish Date',
      flex: 1,
      type: 'string',
      valueGetter: (params: any) => {
        return params.row?.creation_time ? `${params.row?.creation_time}` : '--';
      }
    },
    {
      field: 'state',
      headerClassName: 'table--header',
      headerName: 'State',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.state ? `${params.row?.state}` : '--';
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
                onClick={() => {
                  navigate(`/datasets/${params.row.dataset_id}/versions/${params.row.id}`);
                }}
              >
                Edit
              </Button>
            ) : null}
          </>
        );
      }
    }
  ];

  return (
    <Box className={styles.container}>
      {rows?.length > 0 ? (
        <Box>
          <AppStripedDataGrid columns={columns} rows={rows} />
        </Box>
      ) : (
        <p>There are no datasets to display for this user.</p>
      )}
    </Box>
  );
};

export default DatasetVersionsTable;
