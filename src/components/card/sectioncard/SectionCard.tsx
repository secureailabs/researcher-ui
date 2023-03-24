import { Box } from '@mui/material';
import styles from './SectionCard.module.css';
export interface ISectionCard {
  children: React.ReactNode
}

const SectionCard: React.FC<ISectionCard> = ({ children }) => {
  return (
    <Box className={styles.container}>
        {children}
    </Box>

  )
};

export default SectionCard;
