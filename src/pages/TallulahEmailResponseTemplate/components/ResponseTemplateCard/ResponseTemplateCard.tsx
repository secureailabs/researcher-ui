import { Box, Button, IconButton, Typography } from '@mui/material';
import styles from './ResponseTemplateCard.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

export interface IReponseTemplateCard {
  data: any;
}

const ReponseTemplateCard: React.FC<IReponseTemplateCard> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          position: 'relative',
          marginBottom: '1rem'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold'
            }}
          >
            {data.name}
          </Typography>
        </Box>
        <Box className={styles.subContainer}>
          <Typography className={styles.subTitle}>
            Subject:
            <Typography variant="body1" className={styles.subText}>
              {data.subject}
            </Typography>
          </Typography>
        </Box>
        <Box className={styles.subContainer}>
          <Typography className={styles.subTitle}>
            Body:
            {!isExpanded ? (
              <Typography
                variant="body1"
                display="inline"
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1
                }}
                className={styles.subText}
              >
                {/* remove all htrml tags and display only text */}
                {data.body.replace(/<[^>]*>?/gm, '')}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                display="inline"
                className={styles.subText}
                dangerouslySetInnerHTML={{ __html: data.body }}
              ></Typography>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            postiion: 'absolute',
            bottom: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Typography
            sx={{
              fontStyle: 'italic',
              color: 'gray'
            }}
          >
            Last Updated: &nbsp;
            <Typography variant="body1" component={'span'}>
              {data.lastUpdated}
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%'
        }}
      >
        <IconButton className={styles.viewMoreButton} onClick={() => setIsExpanded((prev) => !prev)}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ReponseTemplateCard;
