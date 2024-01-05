import { Box, Button, Link, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';
import { useNavigate } from 'react-router-dom';
import AddStatusModal from 'src/pages/TallulahStorySolicit/components/AddStatusModal';

export interface ISocialResultCard {
  data: any;
}

const YoutubeResultCard: React.FC<ISocialResultCard> = ({ data }) => {
  const leukemiaResult = data;
  const videoId = leukemiaResult.id.videoId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const navigate = useNavigate();
  const demoUserAccount = 'https://www.youtube.com/@life-with-the-bridges';


  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box className={styles.video}>
            <iframe
              width="100%"
              height="250"
              src={embedUrl}
              title={leukemiaResult.snippet.title}
              allowFullScreen
            ></iframe>
          </Box>
          <Box sx={{ minHeight: 80 }}>
            <Typography variant="h2" className={styles.name}>
              {leukemiaResult.snippet.title}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography className={styles.description}>{leukemiaResult.snippet.description}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" display="inline" className={styles.title}>
              Channel : </Typography>
            <Link display="inline" href={demoUserAccount}>{leukemiaResult.snippet.channelTitle}</Link>
          </Box>
        </Box>
      </Box>
      <AddStatusModal />
      <Stack sx={{ mt: 1, marginRight: 1 }} direction={'row-reverse'}>
        <Typography justifyContent={'flex-end'} alignItems={'flex-end'}>{leukemiaResult.snippet.publishedAt}</Typography>
      </Stack>
    </Box>
  );
};

export default YoutubeResultCard;
