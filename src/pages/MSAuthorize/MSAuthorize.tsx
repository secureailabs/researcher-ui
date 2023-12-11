import { MailboxProvider, MailboxService } from 'src/tallulah-ts-client';
import styles from './MSAuthorize.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export interface IMSAuthorize {}

const MSAuthorize: React.FC<IMSAuthorize> = ({}) => {
  const [mailBoxAdditionError, setMailBoxAdditionError] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const sampleURL = "http://127.0.0.1:3000/authorize?code=0.AXwA7-V0Pmp-8EyFc2gMpJtk2ER0JF_4_7JCk2IdL-UkbeF8AAA.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P_iq1j6vvgKxuse5GO1h2PpzJLhssc3mgs313crOE0cthBPbK1NOy35rFmLKeiiu9XmhYRYdH60V4_OGFeMMz1Bptu0bBjoE2JCWtDqhTZPGX6El9FBqA0VGBq5R0803GqeG_p5FmLpPp5PtWbHTk0C7Yao_zgG8EFtY4T_W3YzPr6yQFoxALi4n0C81IYW24kTDjApoEjuDXUxXw0TqsDa0BeBwzgL-kfYDL7o1ka0Yug1e8O--JBPPobN-M88LzScy5QfU3pycOS66g1k3J-sVZvDVoY4PWOnzPyWdochiuUb_bGU_0vZRJpOutM9wY-Mu83O-6kuowzOFO5EyYNXvHg9RcqBN6XbsXHKTVW1aVIrFbAAkY5T7vyP78pT6wRvjIzYyd2K3EOpLj7M5rPGafk1ueL-E6MiToBNcAtctgA-xFAgfg3EDzK0NHV6p5Z3noRm-Q-mOEEaKkwgHyDwYCBzIzWJml1pVmu_hiPfcVGI6OFSKqZ2uQH8FUWmx5NuKUqixk-5MxQomwOVY8qwnl8uZ9xkdtFIYpvvOrUoLGuQmcRLoVe-mqkM4OAEEtEGzPsbM2LURLtYH0dSrzcT-HKLWfduu4wZD41JRpdA83HB64eGIo0bsqhNUIW_qrG7w19gnsyI9n5N6dWg5gNvesFcgtVJjmUDTkbfNBG4sijXDUuc18GbVXtDOdxQg1Vtmh9oQqjpF5YPw5e_ma-E59WEhPgQTXziQEpPOWBVwG9r6frP3AkPzSKquP8jA0N8v4F8SI4Wwzm6qqWiQkZN18IBGvkl9ZxMBg&session_state=187d773c-e988-44e0-8ece-3b3596a919f5#"

  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const navigate = useNavigate();

  const registerMailBox = async () => {
    setIsLoading(true);
    try {
      const response = await MailboxService.addNewMailbox({
        code: code || '',
        provider: MailboxProvider.OUTLOOK
      });
      navigate('/home');
    } catch (e) {
      setMailBoxAdditionError(true);
      console.log('Mailbox Add Error', e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    registerMailBox();
  }, []);

  if (!isLoading && mailBoxAdditionError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Typography variant="h4" component="h4">
          Something went wrong while setting up your mailbox
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/home');
          }}
        >
          Go to home
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress />
      <Typography variant="h4" component="h4">
        Please wait while we are setting up your mailbox
      </Typography>
    </Box>
  );
};

export default MSAuthorize;
