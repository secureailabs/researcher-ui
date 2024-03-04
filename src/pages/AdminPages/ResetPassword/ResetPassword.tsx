import React, { useState } from 'react';
import { Box, TextField, Button, LinearProgress, Typography } from '@mui/material';
import styles from './ResetPassword.module.css';
import useNotification from 'src/hooks/useNotification';
import { AuthenticationService } from 'src/tallulah-ts-client';
export interface IResetPassword {}

const ResetPassword: React.FC<IResetPassword> = ({}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [sendNotification] = useNotification();

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 5) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmitClick = async () => {
    // Basic validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      sendNotification({
        msg: 'Please fill in all fields.',
        variant: 'error'
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      sendNotification({
        msg: 'Passwords do not match.',
        variant: 'error'
      });
      return;
    }

    try {
      AuthenticationService.resetUserPassword({
        current_password: oldPassword,
        new_password: newPassword
      });
      sendNotification({
        msg: 'Password reset successful.',
        variant: 'success'
      });
      // Reset state
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordStrength(0);
    } catch (error) {
      sendNotification({
        msg: 'Password reset failed. Please try again.',
        variant: 'error'
      });
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 40) return '#d32f2f'; // Red for weak
    if (strength <= 80) return '#fbc02d'; // Yellow for medium
    return '#388e3c'; // Green for strong
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h3">Reset Password</Typography>
      <Box>
        <Typography>This is the reset password page.</Typography>
      </Box>
      <Box mt={2}>
        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        {newPassword && (
          <Box sx={{ marginBottom: '10px' }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: '0.75rem'
              }}
            >
              Strength Indicator
            </Typography>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getPasswordStrengthColor(passwordStrength)
                }
              }}
            />
          </Box>
        )}
        <TextField
          label="Confirm New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmitClick}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPassword;
