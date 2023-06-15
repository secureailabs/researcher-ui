import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import DataGridTable from 'src/components/datagrid/DatagridTable';
// import styles from './DatasetsTable.module.css';

export interface IDatasetsTable {
  data: any;
}

const DatasetsListTable: React.FC<IDatasetsTable> = ({ data }) => {
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    setRows(data);
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerClassName: 'header',
      headerName: 'Name',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row.name ? params.row.name : '--';
      },
    },
    {
      field: 'creation_time',
      headerClassName: 'header',
      headerName: 'Publish Date',
      flex: 1,
      type: 'string',
      valueGetter: (params: any) => {
        return params.row?.creation_time ? `${params.row?.creation_time}` : '--';
      }
    },
    {
      field: 'tags',
      headerClassName: 'header',
      headerName: 'Keywords',
      flex: 1,
      type: 'array',
      valueGetter: (params: any) => {
        return params.row?.tags ? `${params.row?.tags}` : '--';
      }
    },
    {
      field: 'format',
      headerClassName: 'header',
      headerName: 'Format',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.format ? `${params.row?.format}` : '--';
      }
    },
    {
      field: 'state',
      headerClassName: 'header',
      headerName: 'State',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.state ? `${params.row?.state}` : '--';
      }
    },
  ];

  return (
    <Box>
      {rows.length > 0 ? (
        <Box>
          <DataGridTable
            columns={columns}
            rows={rows}
            base_url={'/datasets'}
          />
        </Box>
      ) : <p>There are no datasets to display for this user.</p>}
    </Box>
  );
};

export default DatasetsListTable;
