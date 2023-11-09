import { Box, Drawer, Typography } from '@mui/material';
import styles from './EmailDisplaySection.module.css';
import { GridColDef } from '@mui/x-data-grid';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import { useEffect, useState } from 'react';
import { EmailsService, GetEmail_Out } from 'src/tallulah-ts-client';
import { render } from '@testing-library/react';
import EmailDetailedView from '../EmailDetailedView';

export interface IEmailDisplaySection {
  mailboxes: any[];
}

const resetPaginationData = {
  count: 0,
  offset: 0,
  limit: 25
};

const formatReceivedTime = (receivedTime: string) => {
  const currentDate = new Date();
  const receivedDate = new Date(receivedTime);

  const currentYear = currentDate.getFullYear();
  const receivedYear = receivedDate.getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (currentYear === receivedYear) {
    // If the year is the current year, format as '10 Oct'
    const day = receivedDate.getDate();
    const month = monthNames[receivedDate.getMonth()];
    return `${day} ${month}`;
  } else {
    // If it's a different year, format as '10 Oct 2022'
    const day = receivedDate.getDate();
    const month = monthNames[receivedDate.getMonth()];
    const year = receivedYear;
    return `${day} ${month} ${year}`;
  }
};

const EmailDisplaySection: React.FC<IEmailDisplaySection> = ({ mailboxes }) => {
  const [rows, setRows] = useState<GetEmail_Out[]>([]);
  const [paginationData, setPaginationData] = useState(resetPaginationData);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const MAIL_BOX_ID = mailboxes[0]._id;

  const getEmails = async () => {
    const response = await EmailsService.getAllEmails(MAIL_BOX_ID, paginationData.offset, paginationData.limit);
    setRows([...rows, ...response.messages]);
    setPaginationData({
      ...paginationData,
      offset: paginationData.offset + paginationData.limit
    });
  };

  useEffect(() => {
    getEmails();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerClassName: 'table--header',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '120ch',
            fontSize: '0.8rem'
          }}
        >
          {params.row.from_address.emailAddress.address}
        </Typography>
      )
    },
    {
      field: 'body',
      headerClassName: 'table--header',
      headerName: 'Body',
      flex: 3,
      type: 'string',
      renderCell: (params) => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '120ch',
              fontSize: '0.8rem'
            }}
          >
            {params.row.body.content.replace(/<[^>]*>?/gm, '')}
          </Typography>
          <Box
            sx={{
              marginTop: '6px',
              display: 'flex'
            }}
          >
            <Typography
              sx={{
                fontSize: '0.65rem',
                backgroundColor: '#9fdef5',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
              variant="body1"
            >
              General Info
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'date',
      headerClassName: 'table--header',
      headerName: '',
      flex: 0.3,
      type: 'string',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Typography
            sx={{
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: '#757575'
            }}
            variant="body1"
          >
            {formatReceivedTime(params.row.received_time)}
          </Typography>
        </Box>
      )
    }
  ];
  return (
    <Box
      sx={{
        backgroundColor: '#fff'
      }}
    >
      <AppStripedDataGrid
        autoHeight
        rows={rows}
        columns={columns}
        rowCount={2000}
        pageSizeOptions={[25]}
        pageSize={25}
        onPageChange={() => getEmails()}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row: any) => row._id}
        getCellClassName={(params: any) => {
          return styles.cell;
        }}
        getRowHeight={(params: any) => {
          return 70;
        }}
        onRowClick={(params: any) => {
          // filter row with selected row id and
          const filteredRows = rows.filter((row) => row._id === params.row._id);
          setSelectedRow(filteredRows[0]);
          setOpenDrawer(true);
        }}
      />
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '60%', padding: '20px 0 0 20px' }
        }}
      >
        <EmailDetailedView data={selectedRow} />
      </Drawer>
    </Box>
  );
};

export default EmailDisplaySection;
