import { GridColDef } from '@mui/x-data-grid';
//import * as React from 'react';
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { ApiError, GetDataset_Out } from 'src/client';
import { DefaultService, GetMultipleDataset_Out } from 'src/client';
import DataGridTable from 'src/components/datagrid/DatagridTable';
// import styles from './DatasetsTable.module.css';


const DatasetsTable: React.FC = () => {
  const { data } = useQuery<
    GetMultipleDataset_Out,
    ApiError
  >(['datasets'], DefaultService.getAllDatasets, { refetchOnMount: 'always' });

  console.log(data);
  const tableData: Array<any> = [];
  //const tableData: GetMultipleDataset_Out[] = [];

  const columns: GridColDef[] = [
    { field: 'name', headerClassName: 'header', headerName: 'Name', flex: 1 },
    {
      field: 'creation_time',
      headerClassName: 'header',
      headerName: 'Publish Date',
      flex: 1,
      type: 'string',
      // leaving this valueFormatter for now, until the dataset data formats is known. 
      /*valueFormatter: (params: GridValueFormatterParams<Date>) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value.toLocaleDateString('en')} `;
      }, */
    },
    {
      field: 'tags',
      headerClassName: 'header',
      headerName: 'Keywords',
      flex: 1,
      type: 'array'
    },
    {
      field: 'format',
      headerClassName: 'header',
      headerName: 'Format',
      flex: 1
    },
    {
      field: 'state',
      headerClassName: 'header',
      headerName: 'State',
      flex: 1
    },
  ];


  if (data) {
    return (
      <DataGridTable columns={columns} rows={tableData} error={null} />
    );
  } else {
    return (
      <div> Loading... </div>
    );
  }

};

export default DatasetsTable;
