import { Button, Stack } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import styles from './Socials.module.css';

const Socials = () => {

    return (
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.7rem",
            flex: 1,
          }}
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Google
        </Button>
        <Button
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.7rem",
            flex: 1,
          }}
          variant="outlined"
          startIcon={<TwitterIcon />}
        >
          Twitter
        </Button>
        <Button
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.7rem",
            flex: 1,
          }}
          variant="outlined"
          startIcon={<FacebookIcon />}
        >
          Facebook
        </Button>
      </Stack>
    );
};

export default Socials;