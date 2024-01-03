import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import YoutubeResultCard from '../SocialsDropdown/components/YoutubeResultCards/YoutubeResultCard';
import YOUTUBE_RESULTS from '../../demoSearchResults/default_youtube_results';
import { Grid } from '@mui/material';
import REDDIT_RESULTS from '../../demoSearchResults/default_reddit_results';
import RedditResultCard from '../SocialsDropdown/components/RedditResultCards/RedditResultCard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const youtubeResults = [
  { result: YOUTUBE_RESULTS[0].kidneycancer.items[0] },
  { result: YOUTUBE_RESULTS[0].kidneycancer.items[1] },
  { result: YOUTUBE_RESULTS[0].kidneycancer_stage.items[1] },
  { result: YOUTUBE_RESULTS[0].kidneycancer_stage.items[2] },
];

const redditResults = [
  { result: REDDIT_RESULTS[0].kidneycancer[0] },
  { result: REDDIT_RESULTS[0].kidneycancer[1]},
  { result: REDDIT_RESULTS[0].kidneycancer[2] }
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const SocialsTabs: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs for social search"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 100 }}
      >
        <Tab label="Youtube" {...a11yProps(0)} />
        <Tab label="Reddit" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box>
          <Grid container spacing={3}>
            {youtubeResults.map((result: any) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
              >
                <YoutubeResultCard data={result.result} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container spacing={3}>
            {redditResults.map((result: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
              >
                <RedditResultCard data={result.result} />
              </Grid>
            ))}
          </Grid>
      </TabPanel>
    </Box>
  );
};

export default SocialsTabs;
