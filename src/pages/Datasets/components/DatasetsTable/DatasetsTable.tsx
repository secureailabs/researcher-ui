import { GridColDef } from '@mui/x-data-grid';
import * as React from 'react';
import { useQuery } from 'react-query';
import { ApiError } from 'src/client';
import { DefaultService, GetMultipleDataset_Out } from 'src/client';
import DataGridTable from 'src/components/datagrid/DatagridTable';
// import styles from './DatasetsTable.module.css';


const DatasetsTable: React.FC = () => {

  const { data } = useQuery<
    GetMultipleDataset_Out,
    ApiError
  >(['datasets'], DefaultService.getAllDatasets, { refetchOnMount: 'always' });

  console.log(data);

  const rows = [
    { id: 1, name: 'name1', publishDate: '2023-05-30T12:57:18.535811', keywords: ['key1', 'key2'], format: 'format', state: 'state' },
    { id: 2, name: 'name2', publishDate: '2023-05-30T12:57:18.535811', keywords: 'key2', format: 'csv', state: 'state' },
    { id: 3, name: 'name3', publishDate: '2023-05-30T12:57:18.535811', keywords: 'key3', format: 'json', state: 'state' },
    { id: 4, name: 'name4', publishDate: '2023-05-30T12:57:18.535811', keywords: 'key4', format: 'csv', state: 'state' },
    { id: 5, name: 'name5', publishDate: '2023-05-30T12:57:18.535811', keywords: 'key5', format: 'txt', state: 'state' },
  ];


  const columns: GridColDef[] = [
    { field: 'name', headerClassName:'header', headerName: 'Name', flex: 1 },
    {
      field: 'publishDate',
      headerClassName:'header',
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
      field: 'keywords',
      headerClassName:'header',
      headerName: 'Keywords',
      flex: 1,
      type: 'array'
    },
    {
      field: 'format',
      headerClassName:'header',
      headerName: 'Format',
      flex: 1
    },
    {
      field: 'state',
      headerClassName:'header',
      headerName: 'State',
      flex: 1
    },
  ];

  return (
    <DataGridTable columns={columns} rows={rows} error={null} data={null} />
  );
};

export default DatasetsTable;
