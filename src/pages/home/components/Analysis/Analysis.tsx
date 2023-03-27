import { Box, Typography } from '@mui/material';
import styles from './Analysis.module.css';

export interface IAnalysis {
  sampleTextProp: string;
}

const Analysis: React.FC<IAnalysis> = ({ sampleTextProp }) => {
  return (
    <Box>
      <Typography variant="h6">Analysis</Typography>
    </Box>
  );
};

export default Analysis;
