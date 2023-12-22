import { Box, Button, Chip, Icon, IconButton, Stack, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientCard/PatientCard.module.css';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IStoryStatus {
  data: any;
}

export interface SocialStoryStatus {
  id: number;
  creator: string;
  status: string;
  statusColor?: string;
  dateOfStatus: string;
};

const StoryStatus: React.FC = () => {
  //const [rows, setRows] = useState<SocialStoryStatus[]>();
  const navigate = useNavigate();


  const rows: SocialStoryStatus[] = [
    { id: 1, creator: 'Katie Kicks Cancer', status: 'Received Story', statusColor: 'success', dateOfStatus: '2023-12-20' },
    { id: 2, creator: 'Mayo Clinic', status: 'Declined', statusColor: 'secondary', dateOfStatus: '2023-12-16' },
    { id: 3, creator: 'StarPirate_355', status: 'In Queue', statusColor: 'warning', dateOfStatus: '2023-12-01' },
    { id: 4, creator: 'Snow', status: 'In Queue', statusColor: 'warning', dateOfStatus: '2023-12-01' },
    { id: 5, creator: 'Michael Bluth', status: 'Reached Out', statusColor: 'info', dateOfStatus: '2023-11-05' },
  ];

  const columns = [
    {
      field: 'creator',
      headerName: 'Account Name',
      headerClassName: 'table--header',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
              {params.row.creator}
              <IconButton aria-label="launch" size="small" sx={{ ml: 1 }} 
              onClick={() => navigate('https://www.youtube.com/channel/UCcf5yVgHvI8-__g0RHjfrTw')}>
                <LaunchIcon fontSize="inherit" color='primary' />
              </IconButton>
          </>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Story Status',
      flex: 1,
      headerClassName: 'table--header',
      renderCell: (params: any) => {
        return (
          <>
            <Chip label={params.row.status} color={params.row.statusColor} />
          </>
        );
      }
    },
    {
      field: 'dateOfStatus',
      headerName: 'Date of Status',
      flex: 1,
      headerClassName: 'table--header',
    },
    {
      field: 'action',
      flex: 1,
      headerName: 'Action',
      headerClassName: 'table--header',
      renderCell: (params: any) => {
        return (
          <>
            {rows && rows.length > 0 ? (
              <Button
                variant="text"
                color='secondary'
                size='extraSmall'
                endIcon={<DeleteOutlineIcon fontSize='small' color='secondary'/>}
                sx={{ my: 2, maxHeight: 20 }}
                onClick={() => {

                }}
              >
                Delete 
              </Button>
            ) : null}
          </>
        );
      }
    }
  ];

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Outreach Status of New Stories </Typography>
      <Box sx={{
        mt: 4,
        mb: 12,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        px: 4,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
      >
        <Box sx={{ my: 4 }}>
          <Stack flexDirection={'row-reverse'} alignItems={'center'}>
            <Button variant='contained' startIcon={<AddIcon />} sx={{ mb: 2, alignItems: 'self-end' }}>Add Item</Button>
          </Stack>
          <AppStripedDataGrid
            autoHeight
            rows={rows}
            columns={columns}
            getRowId={(row: any) => row.id}
            rowsPerPageOptions={[25]}
          />
        </Box>
      </Box>
    </Box>

  );
};

export default StoryStatus;