import { Box, Button, Typography } from '@mui/material';
import styles from './EmailDetailedView.module.css';
import { GetEmail_Out } from 'src/tallulah-ts-client';
import SendIcon from '@mui/icons-material/Send';

export interface IEmailDetailedView {
  data: GetEmail_Out;
}

const EmailDetailedView: React.FC<IEmailDetailedView> = ({ data }) => {
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
        <Button variant="outlined" color="primary">
          Previous
        </Button>
        <Button variant="outlined" color="primary">
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

          <Box
            sx={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center'
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
            alignItems: 'center'
          }}
        >
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
