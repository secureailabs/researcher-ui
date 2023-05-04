// project import
import Default from './default';

// types
import { PaletteThemeProps } from 'src/types/theme';
import { PalettesProps } from '@ant-design/colors';
import { ThemeMode, PresetColor } from 'src/types/config';

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  switch (presetColor) {
    default:
      return Default(colors);
  }
};

export default Theme;
