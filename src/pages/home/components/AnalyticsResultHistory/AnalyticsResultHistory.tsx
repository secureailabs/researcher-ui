import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styles from './AnalyticsResultHistory.module.css';
import { Box } from '@mui/material';
import { type IAnalyticsResult } from 'src/shared/types/customTypes';

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
      {result.map((data, index) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const plotUrl = `http://localhost:3001/plot/${data.plot}`;
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
                  {/* plot using iframe */}
                  <iframe
                    src={plotUrl}
                    title="My Scatter Plot"
                    className={styles.plotIframe}
                    sandbox="allow-scripts allow-same-origin"
                  ></iframe>
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
