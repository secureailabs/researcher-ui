import { FormTemplatesService, GetFormTemplate_Out } from 'src/tallulah-ts-client';
import styles from './FormTemplates.module.css';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import { GridColDef } from '@mui/x-data-grid';

export interface IFormTemplates {
  sampleTextProp?: string;
}

const FormTemplates: React.FC<IFormTemplates> = () => {
  const [formTemplates, setFormTemplates] = useState<GetFormTemplate_Out[]>([]);

  const fetchFormTemplates = async () => {
    try {
      const res = await FormTemplatesService.getAllFormTemplates();
      setFormTemplates(res.templates);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFormTemplates();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerClassName: 'table--header',
      headerName: 'Name',
      flex: 1,
      sortable: false,
      renderCell: (params) => <Typography variant="body1">{params.row.name}</Typography>
    },
    {
      field: 'creation_time',
      headerClassName: 'table--header',
      headerName: 'Creation Time',
      flex: 1,
      sortable: false,
      renderCell: (params) => <Typography variant="body1">{params.row.creation_time}</Typography>
    },
    {
      field: 'last_edit_time',
      headerClassName: 'table--header',
      headerName: 'Last Edit Time',
      flex: 1,
      sortable: false,
      renderCell: (params) => <Typography variant="body1">{params.row.last_edit_time}</Typography>
    },
    {
      field: 'state',
      headerClassName: 'table--header',
      headerName: 'State',
      flex: 1,
      sortable: false,
      renderCell: (params) => <Typography variant="body1">{params.row.state}</Typography>
    },
    {
      field: 'actions',
      headerClassName: 'table--header',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button variant="text" color="primary">
          Edit
        </Button>
      )
    }
  ];

  const handleNewFormTemplateClicked = () => {
    console.log('New Form Template Clicked');
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px'
        }}
      >
        <Button variant="contained" color="primary" onClick={handleNewFormTemplateClicked}>
          Add New Form Template
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff'
        }}
      >
        <AppStripedDataGrid autoHeight rows={formTemplates} columns={columns} />
      </Box>
    </Box>
  );
};

export default FormTemplates;
