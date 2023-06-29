// types
import { DefaultConfigProps } from 'src/types/config';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;

// URLS:
// export const REACT_APP_SAIL_API_SERVICE_URL = 'http://127.0.0.1:8000';
// export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'http://127.0.0.1:8000';

export const REACT_APP_SAIL_API_SERVICE_URL = 'http://172.20.100.7:8000';
export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'http://172.20.100.8:8000';

// export const REACT_APP_SAIL_API_SERVICE_URL = 'https://api.demo.arrayinsights.net';
// export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'https://api.demo.arrayinsights.net';

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: 'vertical',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
