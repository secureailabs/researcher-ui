// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'src/assets/images/sail-logo.webp';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return <img src={logo} alt="Sail-Logo" width="40" />;
};

export default LogoIcon;
