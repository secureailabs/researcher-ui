import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GetMultipleDatasetVersion_Out, ApiError, DefaultService } from 'src/client';
import DataGridTable from 'src/components/datagrid/DatagridTable';
// import styles from './DatasetVersionsTable.module.css';


const DatasetVersionsTable: React.FC = () => {
  const [rows, setRows] = useState<any>([]);
  const { id } = useParams() as { id: string };

  const { data, refetch } = useQuery<
    GetMultipleDatasetVersion_Out,
    ApiError
  >(['dataset_versions'], () => DefaultService.getAllDatasetVersions(id), {
    refetchOnMount: 'always'
  });


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
        <Box sx={{ borderColor: 'lightgrey', boxShadow: 4 }}>
          <DataGridTable
            columns={columns}
            rows={rows}
            base_url={'/dashboard/datasets/' + id + '/versions'}
          />
        </Box>
      ) : <p>There are no previous dataset versions. Any changes to a dataset will appear here. </p>}
    </Box>
  );
};

export default DatasetVersionsTable;
