import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '.table--header': {
    backgroundColor: '#EAEFF0'
  },
  '.MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold'
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: '#f5f5f5',
    '&:hover, &.Mui-hovered': {
      backgroundColor: theme.palette.grey[300],
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}));

export default function AppStripedDataGrid(props: any) {
  return (
    <StripedDataGrid
      getRowClassName={(params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
      }}
      {...props}
    />
  );
}
