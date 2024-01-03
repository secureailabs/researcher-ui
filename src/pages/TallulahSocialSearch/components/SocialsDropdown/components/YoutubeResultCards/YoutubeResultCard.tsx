import { Box, Button, Link, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';
import { Transcribe } from '@mui/icons-material';
import TranscribeVideoModal from '../TranscribeVideoModal/TranscribeVideoModal';
import TRANSCRIPTION_RESULTS from 'src/pages/TallulahSocialSearch/demoSearchResults/default_transcription_mapping';
import { useNavigate } from 'react-router-dom';

export interface ISocialResultCard {
  data: any;
}

const YoutubeResultCard: React.FC<ISocialResultCard> = ({ data }) => {
  const kidneyCancerResult = data;
  const videoId = kidneyCancerResult.id.videoId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const navigate = useNavigate();
  const demoUserAccount = 'https://www.youtube.com/channel/UCcf5yVgHvI8-__g0RHjfrTw';


  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box className={styles.video}>
            <iframe
              width="100%"
              height="250"
              src={embedUrl}
              title={kidneyCancerResult.snippet.title}
              allowFullScreen
            ></iframe>
          </Box>
          <Box sx={{ minHeight: 80 }}>
            <Typography variant="h6" className={styles.name}>
              {kidneyCancerResult.snippet.title}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography className={styles.description}>{kidneyCancerResult.snippet.description}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" display="inline" className={styles.title}>
              Channel : </Typography>
            <Link display="inline" href={demoUserAccount}>{kidneyCancerResult.snippet.channelTitle}</Link>
          </Box>
        </Box>
      </Box>
      <Button sx={{width: 125, maxHeight: 30}} type='submit' variant='contained' onClick={() => window.open(demoUserAccount)}>Add to Queue</Button>
      <Stack sx={{ mt: 1, marginRight: 1 }} direction={'row-reverse'}>
        <Typography justifyContent={'flex-end'} alignItems={'flex-end'}>{kidneyCancerResult.snippet.publishedAt}</Typography>
      </Stack>
    </Box>
  );
};

export default YoutubeResultCard;
