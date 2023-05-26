import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './DatasetsTable.module.css';
import { useQuery } from 'react-query';
//import { ApiError } from 'src/client';
//import { DefaultService, GetMultipleDataset_Out } from 'src/client';



function createData(
  name: string,
  publishDate: string,
  keywords: string[],
  format: string,
  state: string,
) {
  return { name, publishDate, keywords, format, state };
}

const rows = [
  createData('data1', '2010', ['key'], '24', 'state'),
  createData('data1', '2010', ['key'], '24', 'state'),
  createData('data1', '2010', ['key'], '24', 'state'),
  createData('data1', '2010', ['key'], '24', 'state'),
  createData('data1', '2010', ['key'], '24', 'state'),
];

const DatasetsTable: React.FC = () => {

 /* const { data, isLoading, status, error, refetch } = useQuery<
    GetMultipleDataset_Out,
    ApiError
  >(['datasets'], DefaultService.getAllDatasets, { refetchOnMount: 'always' });
*/
 
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Publish Date</TableCell>
            <TableCell align="right">Keywords</TableCell>
            <TableCell align="right">Format</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.publishDate}</TableCell>
              <TableCell align="right">{row.keywords}</TableCell>
              <TableCell align="right">{row.format}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   );
  };
  
  export default DatasetsTable;
  