// material-ui
import logo from 'src/assets/images/array-insights.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  return <img src={logo} alt="Sail-Logo" width="100" />;
};

export default LogoMain;
