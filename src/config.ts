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

// URLS:
// export const REACT_APP_SAIL_API_SERVICE_URL = 'http://127.0.0.1:8000';
// export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'http://127.0.0.1:8000';

// export const REACT_APP_SAIL_API_SERVICE_URL = 'https://api.tbbc.tallulah.ai';
// export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'https://api.tbbc.tallulah.ai';
// export const REACT_APP_GOOGLE_API_KEY = 'AIzaSyCQBK2nekthzHxf-3ccXwtb6WZ769Cygnw';
// export const BASE_URL = 'https://api.tbbc.tallulah.ai';

export const REACT_APP_SAIL_API_SERVICE_URL = 'https://tallulah-backend.victoriouswater-1c439fdc.westus.azurecontainerapps.io';
export const REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL = 'https://tallulah-backend.victoriouswater-1c439fdc.westus.azurecontainerapps.io';
export const REACT_APP_GOOGLE_API_KEY = 'https://tallulah-backend.victoriouswater-1c439fdc.westus.azurecontainerapps.io';
export const BASE_URL = 'https://tallulah-backend.victoriouswater-1c439fdc.westus.azurecontainerapps.io';
export const OUTLOOK_REDIRECT_URI = 'https://tallulah-backend.victoriouswater-1c439fdc.westus.azurecontainerapps.io/mailbox/authorize';

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
