import { Box, CircularProgress, Drawer, Tooltip, Typography } from '@mui/material';
import styles from './EmailDisplaySection.module.css';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';
import { useEffect, useState } from 'react';
import { EmailsService, GetEmail_Out } from 'src/tallulah-ts-client';
import EmailDetailedView from '../EmailDetailedView';
import ReplyIcon from '@mui/icons-material/Reply';

export interface IEmailDisplaySection {
  mailBoxId: string;
  setSelectionModel: (selectionModel: any) => void;
  selectionModel: string[];
  sortKey: string;
  sortDirection: -1 | 1;
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

const EmailDisplaySection: React.FC<IEmailDisplaySection> = ({ mailBoxId, selectionModel, setSelectionModel, ...props }) => {
  const [rows, setRows] = useState<GetEmail_Out[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getEmails = async (offset = 0) => {
    setLoading(true);
    const response = await EmailsService.getAllEmails(mailBoxId, offset, resetPaginationData.limit, props.sortKey, props.sortDirection);
    setLoading(false);
    setRows([...response.messages]);
  };

  useEffect(() => {
    getEmails();
  }, []);

  console.log('rows', rows);

  useEffect(() => {
    let active = true;

    (async () => {
      if (!active) {
        return;
      }

      const newOffset = page * resetPaginationData.limit;

      getEmails(newOffset);
    })();

    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => {
    const newOffset = 0 * resetPaginationData.limit;
    setPage(0);
    getEmails(newOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sortDirection]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerClassName: 'table--header',
      headerName: 'Name',
      flex: 1,
      sortable: false,
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
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          {params.row.message_state === 'SUCCESS' ? (
            <Tooltip title="You have already responded to this email">
              <ReplyIcon
                sx={{
                  color: '#61a15f',
                  marginRight: '10px'
                }}
              />
            </Tooltip>
          ) : null}
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
        </Box>
      )
    },
    {
      field: 'tag',
      headerClassName: 'table--header',
      headerName: 'Category',
      flex: 0.5,
      type: 'string',
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
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
      sortable: false,
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
        pagination
        checkboxSelection
        pageSize={25}
        rowsPerPageOptions={[25]}
        rowCount={2000}
        paginationMode="server"
        onPageChange={(newPage: any) => {
          console.log('page changed', newPage);
          setPage(newPage);
        }}
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
        onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        loading={loading}
        keepNonExistentRowsSelected
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
