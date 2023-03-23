import { type PaletteMode } from '@mui/material';
import Styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetDesignTokens = (mode: PaletteMode): any => ({
  palette: {
    mode,
    ...(Styles.light)
  }
});

export default GetDesignTokens;
