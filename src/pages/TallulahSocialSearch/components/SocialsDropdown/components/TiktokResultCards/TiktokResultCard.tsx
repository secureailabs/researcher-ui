import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';
import TranscribeVideoModal from '../TranscribeVideoModal/TranscribeVideoModal';
import TRANSCRIPTION_RESULTS from 'src/pages/TallulahStorySolicit/demoSearchResults/default_transcription_mapping';

export interface ISocialResultCard {
  data: any;
}

const TiktokResultCard: React.FC<ISocialResultCard> = ({ data }) => {
  const kidneyCancerResult = data;
  const description: string = kidneyCancerResult.text.slice(0, 50);
  const hashtags: string[] = kidneyCancerResult.hashtags.map((hashtag: any) => hashtag.name).join(', ').slice(0, 100);
  const embedUrl = kidneyCancerResult.mediaUrls[0];

  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box sx={{ minHeight: 60 }}>
            <Typography variant="h6" className={styles.name}>
              {kidneyCancerResult.authorMeta.name}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" display="inline" className={styles.title}>
              Description : </Typography>
            <Typography display="inline">{description}...</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" display="inline" className={styles.title}>
              Hashtags : </Typography>
            <Typography display="inline">{hashtags}...</Typography>
          </Box>
          <Link href={kidneyCancerResult.videoMeta.downloadAddr}>Download video here</Link>
        </Box>
      </Box>
      <Stack flexDirection={'row'} sx={{ alignContent: 'center', justifyContent: 'center' }} className={styles.video}>
        <iframe
          width="75%"
          height="450"
          src={embedUrl}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      </Stack>
      <TranscribeVideoModal
        title={kidneyCancerResult.authorMeta.name}
        refetch={() => { }}
        transcription={kidneyCancerResult.videoMeta.downloadAddr == "https://api.apify.com/v2/key-value-stores/jZEFb4f2TjgxViv7R/records/video-7085801345298550058" ?
          TRANSCRIPTION_RESULTS[0].kidneycancer.items[4].transcription : ""} />
    </Box>
  );
};

export default TiktokResultCard;
