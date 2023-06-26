import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface CsvDisplayProps {
  csvData: Array<string>;
}

const CsvDisplay: React.FC<CsvDisplayProps> = ({ csvData }) => {
  const [headers, ...rows] = csvData.map((row) => row.split(','));
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 400
      }}
    >
      <Table
        sx={{
          minWidth: '100%',
          width: 'max-content',
          alignContent: 'center'
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell sx={{ fontWeight: 'fontWeightBold' }} key={i}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, j) => (
                <TableCell key={j}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CsvDisplay;
