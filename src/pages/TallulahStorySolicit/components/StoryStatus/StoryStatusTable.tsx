import { Box, Button, Chip, Icon, IconButton, Stack, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientCard/PatientCard.module.css';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddStatusModal from '../AddStatusModal';

export interface IStoryStatus {
  data: any;
}

export interface SocialStoryStatus {
  id: number;
  creator: string;
  accountType: string;
  status: string;
  statusColor?: string;
  dateOfStatus: string;
};

const StoryStatus: React.FC = () => {
  //const [rows, setRows] = useState<SocialStoryStatus[]>();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('');



  const rows: SocialStoryStatus[] = [
    { id: 0, creator: 'Life With The Bridges', accountType:'Parent', status: 'In Queue', statusColor: 'warning', dateOfStatus: '2024-01-05'},
    { id: 1, creator: 'Katie Kicks Cancer', accountType:'Patient', status: 'Received Story', statusColor: 'success', dateOfStatus: '2023-12-20' },
    { id: 2, creator: 'Mayo Clinic', accountType:'Organization', status: 'Declined', statusColor: 'secondary', dateOfStatus: '2023-12-16' },
    { id: 3, creator: 'StarPirate_355', accountType:'Patient', status: 'In Queue', statusColor: 'warning', dateOfStatus: '2023-12-01' },
    { id: 4, creator: 'Snow', accountType:'Caregiver', status: 'In Queue', statusColor: 'warning', dateOfStatus: '2023-12-01' },
    { id: 5, creator: 'Michael Bluth', accountType:'Patient', status: 'Reached Out', statusColor: 'info', dateOfStatus: '2023-11-05' },
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
              onClick={() => window.open('https://www.youtube.com/@life-with-the-bridges')}>
                <LaunchIcon fontSize="inherit" color='primary' />
              </IconButton>
          </>
        );
      }
    },
    {
      field: 'accountType',
      headerName: 'Account Type',
      flex: 1,
      headerClassName: 'table--header',
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
                color='primary'
                size='extraSmall'
                endIcon={<Inventory2OutlinedIcon fontSize='small' color='primary'/>}
                sx={{ my: 2, maxHeight: 20 }}
                onClick={() => {

                }}
              >
                Archive 
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
          <Stack flexDirection={'row-reverse'} alignItems={'center'} sx={{mb:2}}>
           <AddStatusModal />
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