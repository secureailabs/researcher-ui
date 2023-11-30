import { Box, Button, Tooltip, Typography } from '@mui/material';
import styles from './EmailDetailedView.module.css';
import { GetEmail_Out } from 'src/tallulah-ts-client';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import { getEmailLabel } from 'src/utils/helper';

export interface IEmailDetailedView {
  data: GetEmail_Out;
  handleViewNextEmailClicked: (rowId: string) => void;
  handleViewPreviousEmailClicked: (rowId: string) => void;
}

const EmailDetailedView: React.FC<IEmailDetailedView> = ({ data, handleViewNextEmailClicked, handleViewPreviousEmailClicked }) => {
  return (
    <Box>
      <Box
        sx={{
          margin: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '4rem',
          gap: '1rem'
        }}
      >
        <Button variant="outlined" color="primary" onClick={() => handleViewPreviousEmailClicked(data._id)}>
          Previous
        </Button>
        <Button variant="outlined" color="primary" onClick={() => handleViewNextEmailClicked(data._id)}>
          Next
        </Button>
      </Box>
      <Box className={styles.emailContentContainer}>
        <Box>
          <Box className={styles.emailContentHeader}>
            <Box className={styles.labelContainer}>
              <Box className={styles.label}>From:</Box>
              <Box className={styles.emailContentHeaderFromValue}>
                {data.from_address.emailAddress.name} ({data.from_address.emailAddress.address})
              </Box>
            </Box>
            <Box className={styles.labelContainer}>
              <Box className={styles.label}>Date:</Box>
              <Box className={styles.emailContentHeaderDateValue}>{data.received_time}</Box>
            </Box>
            <Box className={styles.labelContainer}>
              <Box className={styles.label}>Subject:</Box>
              <Box className={styles.emailContentSubjectValue}>{data.subject}</Box>
            </Box>
          </Box>
          {data.annotations ? (
            <Box
              sx={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {data.message_state === 'NEW' ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      backgroundColor: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                    variant="body1"
                  >
                    New
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    marginTop: '6px',
                    display: 'flex'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      backgroundColor: `${getEmailLabel(data.annotations[0].label)?.color}`,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                    variant="body1"
                  >
                    {data.annotations[0]?.label}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : null}

          <Box
            sx={{
              marginTop: '2rem',
              marginBottom: '4rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box className={styles.emailContentBody}>{data.body.content}</Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {data.message_state === 'RESPONDED' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '1rem'
              }}
            >
              <Tooltip title="You have already responded to this email">
                <ReplyIcon
                  sx={{
                    color: '#61a15f',
                    marginRight: '10px'
                  }}
                />
              </Tooltip>
              <Typography>You have already responded to this email.</Typography>
            </Box>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            sx={{
              padding: '0.5rem 2rem'
            }}
          >
            Reply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailDetailedView;
