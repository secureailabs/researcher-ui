import { Box, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';

export interface IPatientCard {
  data: any;
  index: number;
}

const YoutubeResultCard: React.FC<IPatientCard> = ({ data, index }) => {

  console.log(data[0].kidneycancer.items[index].snippet.title, 'data');
  const videoId = data[0].kidneycancer.items[index].id.videoId;

  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box sx={{ minHeight: 60 }}>
            <Typography variant="h6" className={styles.name}>
              {data[0].kidneycancer.items[index].snippet.title}
            </Typography>
          </Box>
          <Typography variant="body1" className={styles.fields}>
            Description : {data[0].kidneycancer.items[index].snippet.description}</Typography>
          <Typography className={styles.fields}>Published At : {data[0].kidneycancer.items[index].snippet.publishedAt}</Typography>
          <Typography className={styles.fields}>Channel : {data[0].kidneycancer.items[index].snippet.channelTitle}</Typography>
        </Box>
      </Box>
      <Box className={styles.section1}>
        <iframe
          width="100%"
          height="250"
          src={embedUrl}
          title={data[0].kidneycancer.items[0].snippet.title}
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default YoutubeResultCard;
