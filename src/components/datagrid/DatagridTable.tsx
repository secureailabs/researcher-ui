import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';


export type TableProps = {
  columns: any[];
  rows: any[];
};

const StyledDataGrid = styled(DataGrid)(() => ({
  border: `1px solid lightgray`,
  '.MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold'
  },
  '.MuiDataGrid-columnHeader': {
    borderBottom: '1px solid lightgray'
  },
}));

const DataGridTable: React.FC<TableProps> = (props: any) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        sx={{
          boxShadow: 2,
          px:2
        }}
        {...props}
      />
    </Box>
  );
};

export default DataGridTable;
