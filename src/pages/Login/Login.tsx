import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, Stack } from "@mui/material";
import Socials from "./components/Socials";


export interface ILogin {
  sampleTextProp: string;
}

const Login: React.FC<ILogin> = ({ sampleTextProp }) => {

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 3 }}
          >
            <Typography component="h1" variant="h3">
              Login
            </Typography>
            <Link
              variant="subtitle2"
              href="#"
              underline="hover"
            >
              Don't have an account?
            </Link>
          </Stack>
          <Typography variant="h6">
            Email Address
          </Typography>
          <TextField
            sx={{ mt: 1, mb: 4 }}
            required
            fullWidth
            id="email"
            label="Enter email address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Typography variant="h6">
            Password
          </Typography>
          <TextField
            sx={{ mt: 1, mb: 2 }}
            required
            fullWidth
            name="password"
            label="Enter password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={<Checkbox value="store_signin" color="primary" />}
              label="Keep me signed in" />
            <Link
              variant="subtitle2"
              href="#"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "primary" }}>
              Login with
            </Typography>
          </Divider>
          <Box component='form'>
            <Socials />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
