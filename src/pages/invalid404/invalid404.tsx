import { Box, Button, Typography } from '@mui/material';
import styles from './invalid404.module.css';
import { Link } from 'react-router-dom';

export interface IInvalid404 {
}

const invalid404: React.FC<IInvalid404> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" style={{ color: 'black', marginBottom: '10px' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'black', marginBottom: '10px' }}>
        Error: Page Not Found
      </Typography>
      <Link to="/">
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
};

export default invalid404;
