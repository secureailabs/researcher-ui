import { Box, Button, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';
import { Transcribe } from '@mui/icons-material';
import TranscribeVideoModal from '../TranscribeVideoModal/TranscribeVideoModal';
import TRANSCRIPTION_RESULTS from 'src/pages/TallulahSocialSearch/default_transcription_mapping';

export interface ISocialResultCard {
  data: any;
}

const YoutubeResultCard: React.FC<ISocialResultCard> = ({ data }) => {
  const kidneyCancerResult = data;
  const videoId = kidneyCancerResult.id.videoId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

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
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" display="inline" className={styles.title}>
              Channel : </Typography>
            <Typography display="inline">{kidneyCancerResult.snippet.channelTitle}</Typography>
          </Box>
        </Box>
      </Box>
      <TranscribeVideoModal
        title={kidneyCancerResult.snippet.title}
        refetch={() => { }}
        transcription={kidneyCancerResult.snippet.title == "Stage IV Kidney Cancer" ?
          TRANSCRIPTION_RESULTS[0].kidneycancer.items[2].transcription : ""} />
      <Stack sx={{ mt: 2, marginRight:2 }} direction={'row-reverse'}>
        <Typography justifyContent={'flex-end'} alignItems={'flex-end'}>{kidneyCancerResult.snippet.publishedAt}</Typography>
      </Stack>
    </Box>
  );
};

export default YoutubeResultCard;
