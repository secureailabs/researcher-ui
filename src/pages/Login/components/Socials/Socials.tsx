import { Button, Stack } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

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
      </Stack>
    );
};

export default Socials;