// material-ui
import { Box } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = (): JSX.Element => {
  return (
    <>
      {/* logo & toggler button */}
      <Box>
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
      </Box>
    </>
  );
};

export default Header;
