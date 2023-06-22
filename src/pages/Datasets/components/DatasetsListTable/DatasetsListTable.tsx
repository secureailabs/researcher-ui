import { Box, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';

// import styles from './DatasetsTable.module.css';

export interface IDatasetsTable {
  data: any;
}

const DatasetsListTable: React.FC<IDatasetsTable> = ({ data }) => {
  const [rows, setRows] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRows(data);
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerClassName: 'table--header',
      headerName: 'Name',
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
      field: 'tags',
      headerClassName: 'table--header',
      headerName: 'Keywords',
      flex: 1,
      type: 'array',
      valueGetter: (params: any) => {
        return params.row?.tags ? `${params.row?.tags}` : '--';
      }
    },
    {
      field: 'format',
      headerClassName: 'table--header',
      headerName: 'Format',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.format ? `${params.row?.format}` : '--';
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
                  navigate(`/datasets/${params.row.id}`);
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
    <Box>
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

export default DatasetsListTable;
