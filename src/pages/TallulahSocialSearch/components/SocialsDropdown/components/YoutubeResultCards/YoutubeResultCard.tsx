import { Box, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';

export interface ISocialResultCard {
  data: any;
  index: number;
}

const YoutubeResultCard: React.FC<ISocialResultCard> = ({ data, index }) => {

  console.log(data[0].kidneycancer.items[index].snippet.title, 'data');

  const kidneyCancerResult = data[0].kidneycancer.items[index];
  const videoId = kidneyCancerResult.id.videoId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box sx={{ minHeight: 60 }}>
            <Typography variant="h6" className={styles.name}>
              {kidneyCancerResult.snippet.title}
            </Typography>
          </Box>
          <Typography variant="body1" className={styles.fields}>
            Description : {kidneyCancerResult.snippet.description}</Typography>
          <Typography className={styles.fields}>Published At : {kidneyCancerResult.snippet.publishedAt}</Typography>
          <Typography className={styles.fields}>Channel : {kidneyCancerResult.snippet.channelTitle}</Typography>
        </Box>
      </Box>
      <Box className={styles.video}>
        <iframe
          width="100%"
          height="250"
          src={embedUrl}
          title={kidneyCancerResult.snippet.title}
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default YoutubeResultCard;
