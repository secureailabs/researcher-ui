import { Box, Link, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';

export interface ISocialResultCard {
  data: any;
  index: number;
}

const RedditResultCard: React.FC<ISocialResultCard> = ({ data, index }) => {
  const kidneyCancerResult = data[0].kidneycancer[index];

  return (
    <Box className={styles.container}>
      <Box sx={{ mb: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" className={styles.name}>
            {kidneyCancerResult.username}</Typography>
        </Box>
        <Box minHeight={50} sx={{ mb: 2 }}>
          <Typography variant="body1" display="inline" className={styles.title}>
            Content : </Typography>
          <Typography display="inline">{kidneyCancerResult.body}</Typography>
        </Box>
        <Link href={kidneyCancerResult.url}>Click to view Reddit post</Link>
      </Box>
    </Box>
  );
};

export default RedditResultCard;
