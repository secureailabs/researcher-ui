import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Accordion, Stack } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import YOUTUBE_DATA from '../../default_youtube_results';
import YoutubeResultCard from './components/YoutubeResultCards/YoutubeResultCard';


interface ISocialDropdown {
  sampleTextProp: string;
}


const SocialsDropdown: React.FC<ISocialDropdown> = ({ sampleTextProp }) => {
  const [expanded, setChangeExpanded] = useState<string | true>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setChangeExpanded(newExpanded ? panel : true);
    };

  return (
    <Box>
      <Accordion defaultExpanded={true} onChange={handleChange('youtube')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="youtube-content"
          id="youtube-header"
        >
          <Typography>YouTube</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack flexDirection={'row'} alignContent={'center'}>
            <YoutubeResultCard data={YOUTUBE_DATA} index={0} />
            <YoutubeResultCard data={YOUTUBE_DATA} index={1} />
            <YoutubeResultCard data={YOUTUBE_DATA} index={2} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true} onChange={handleChange('tiktok')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>TikTok</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <YoutubeResultCard data={YOUTUBE_DATA} index={0} />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true} onChange={handleChange('reddit')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <YoutubeResultCard data={YOUTUBE_DATA} index={0} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SocialsDropdown;
