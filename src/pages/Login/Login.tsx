import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider, IconButton, InputAdornment, Stack } from "@mui/material";
import Socials from "./components/Socials";
import styles from './Login.module.css';
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { LoginSuccess_Out, OpenAPI } from 'src/client';
import { DefaultService, Body_login } from 'src/client';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export interface IEmailAndPassword {
  username: string;
  password: string;
}

// TODO: Implement login error in POG-388 
const showLoginError = Store.addNotification({
  title: "Error",
  message: "Login Attempt Failed",
  type: "danger",
  insert: "top",
  container: "center",
  animationIn: ["animate__animated", "animate__zoomOut"],
  animationOut: ["animate__animated", "animate__zoomOut"],
  dismiss: {
    duration: 5000,
    click: true
  }
});

const Login: React.FC = () => {
  const { handleSubmit, control, register, formState } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  async function post(data: IEmailAndPassword): Promise<LoginSuccess_Out> {
    // OpenAPI.BASE = 'https://172.20.100.8:8000';
    if (!process.env.REACT_APP_SAIL_API_SERVICE_URL)
      throw new Error('REACT_APP_SAIL_API_SERVICE_URL not set');

    OpenAPI.BASE = process.env.REACT_APP_SAIL_API_SERVICE_URL;
    const login_req: Body_login = {
      username: data.username,
      password: data.password
    };
    const res = await DefaultService.login(login_req);
    OpenAPI.TOKEN = res.access_token;
    localStorage.setItem('token', res.access_token);
    return res;
  }

  //const queryClient = new QueryClient();
  // @ts-ignore
  const loginMutation = useMutation<LoginSuccess_Out, AxiosError>(post, {
    onSuccess: () => console.log("successful login")
  });


  return (
    <Container component="main" className={styles.container}>
      <Box
        sx={{
          mt: 6,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1, width: 400 }} onSubmit={handleSubmit(onSubmit)}>
          <Box
            className={styles.stack}
            sx={{ my: 3 }}
          >
            <Typography variant="h3">
              Login
            </Typography>
            <Link
              variant="subtitle2"
              href="#"
              underline="hover"
            >
              Don't have an account?
            </Link>
          </Box>
          <Typography variant="h6">
            Email Address
          </Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 4 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                id="username"
                label="Enter email address"
                autoComplete="email"
                autoFocus
              />
            )}
            rules={{ required: 'Email address is required' }}
          />
          <Typography variant="h6">
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>)
                }}
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                id="password"
                label="Enter password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
              />
            )}
            rules={{ required: 'Password is required' }}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={<Checkbox value="stay_signedin" color="primary" />}
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
            onClick={handleSubmit(onSubmit)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
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
