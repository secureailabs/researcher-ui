import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ApiError, GetMultipleDataset_Out } from 'src/client';
import { styled } from '@mui/material/styles';


export type TableProps = {
  columns: any[];
  rows: any[];
  error: ApiError | null;
  data: GetMultipleDataset_Out | null;
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

const DataGridTable: React.FC<TableProps> = ({ columns, rows, error, data }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        sx={{
          boxShadow: 2
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridTable;
