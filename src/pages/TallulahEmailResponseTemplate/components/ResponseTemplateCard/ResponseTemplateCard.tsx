import { Box, Button, Icon, IconButton, Typography } from '@mui/material';
import styles from './ResponseTemplateCard.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GetResponseTemplate_Out } from 'src/tallulah-ts-client';

export interface IResponseTemplateCard {
  data: GetResponseTemplate_Out;
}

const ResponseTemplateCard: React.FC<IResponseTemplateCard> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          position: 'relative',
          marginBottom: '1rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold'
            }}
          >
            {data.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem'
            }}
          >
            <IconButton className={styles.editButton}>
              <EditIcon />
            </IconButton>
            <IconButton className={styles.deleteButton}>
              <DeleteIcon />
            </IconButton>
          </Box>
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
                {data.body?.content.replace(/<[^>]*>?/gm, '')}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                display="inline"
                className={styles.subText}
                dangerouslySetInnerHTML={data?.body?.content ? { __html: data.body.content } : { __html: '' }}
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
              {data.last_edit_time}
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
          {!isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResponseTemplateCard;
