import { Box, Link, Stack, Typography } from '@mui/material';
import styles from '../SocialResultCard.module.css';

export interface ISocialResultCard {
  data: any;
  index: number;
}

const TiktokResultCard: React.FC<ISocialResultCard> = ({ data, index }) => {

  console.log(data[0].kidneycancer[0].authorMeta.name, 'tiktok');
  const kidneyCancerResult = data[0].kidneycancer[index];
  const description: string = kidneyCancerResult.text.slice(0, 50);
  const hashtags: string[] = kidneyCancerResult.hashtags.map((hashtag: any) => hashtag.name).join(', ').slice(0, 100);
  const videoId = 'https://www.youtube.com/watch?v=5qap5aO4i9A';

  const embedUrl = kidneyCancerResult.mediaUrls[0];

  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Box sx={{ minHeight: 60 }}>
            <Typography variant="h6" className={styles.name}>
              Creator : {kidneyCancerResult.authorMeta.name}
            </Typography>
          </Box>
          <Typography variant="body1" className={styles.fields}>
            Description : {description}...</Typography>
          <Typography className={styles.fields}>Hashtags : {hashtags}...</Typography>
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
    </Box>
  );
};

export default TiktokResultCard;
