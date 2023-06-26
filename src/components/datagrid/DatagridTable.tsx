import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/client/core/request';

export type TableProps = {
  columns: any[];
  rows: any[];
  base_url?: string;
};

const StyledDataGrid = styled(DataGrid)(() => ({
  border: `1px solid lightgray`,
  '.MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold'
  },
  '.MuiDataGrid-columnHeader': {
    borderBottom: '1px solid lightgrey'
  },
}));

const DataGridTable: React.FC<TableProps> = (props: any) => {
  const navigate = useNavigate();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const checkUrl = `${props.base_url}/${params.row.id}`;

    if (checkUrl.includes('undefined')) {
      return;
    } else {
      navigate(`${props.base_url}/${params.row.id}`);
    }
  }; 

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        sx={{
          boxShadow: 2,
          px: 2
        }}
        onRowClick={handleRowClick}
        {...props}
      />
    </Box>
  );
};

export default DataGridTable;
