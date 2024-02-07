import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styles from './AnalyticsResultHistory.module.css';
import { Box } from '@mui/material';
import { type IAnalyticsResult } from 'src/shared/types/customTypes';
import Plot from 'react-plotly.js';

export interface IAnalyticsResultHistory {
  sampleTextProp: string;
  result: IAnalyticsResult[];
}

const AnalyticsResultHistory: React.FC<IAnalyticsResultHistory> = ({ sampleTextProp, result }) => {
  return (
    <Timeline
      sx={{
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0
        }
      }}
    >
      {result.reverse().map((data, index) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        // get plot url situates in the public folder
        const plotUrl = `${process.env.PUBLIC_URL}/paired_samples_scatterplot.html`;
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index !== result.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box>{data.data}</Box>
              {data.plot != null ? (
                <Box
                  sx={{
                    padding: 2
                  }}
                >
                  <Plot data={data.plot.data} layout={data.plot.layout} />
                </Box>
              ) : null}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default AnalyticsResultHistory;
