// types
import { DefaultConfigProps } from 'src/types/config';
// import { BASE_URL } from './utils/apiServices';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
export const DRAWER_WIDTH_COLLAPSED = 60;

export const REACT_APP_SAIL_API_SERVICE_URL = 'https://touch.tallulah.ai/';
export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'https://touch.tallulah.ai/';
export const REACT_APP_GOOGLE_API_KEY = 'https://touch.tallulah.ai/';
export const BASE_URL = 'https://touch.tallulah.ai/';
export const OUTLOOK_REDIRECT_URI = 'https://touch.tallulah.ai/mailbox/authorize';

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
