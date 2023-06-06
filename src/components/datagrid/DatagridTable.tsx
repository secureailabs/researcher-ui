import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ApiError, GetDataset_Out, GetMultipleDataset_Out } from 'src/client';
import { styled } from '@mui/material/styles';


export type TableProps = {
  columns: any[];
  error: ApiError | null;
  rows: any[];
};

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-cell': {
  },
  '& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-cell': {
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderBottom: '1px solid lightgrey'
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: '0px solid lightgrey'
  }
}));

const DataGridTable: React.FC<TableProps> = ({ columns, rows, error }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        sx={{
          boxShadow: 2
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridTable;
