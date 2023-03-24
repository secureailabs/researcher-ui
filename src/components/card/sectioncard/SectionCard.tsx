import { Box } from '@mui/material';

export interface ISectionCard {
  children: React.ReactNode
}

const SectionCard: React.FC<ISectionCard> = ({ children }) => {
  return (
    <Box>
        {children}
    </Box>

  )
};

export default SectionCard;
