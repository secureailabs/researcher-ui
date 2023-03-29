import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styles from './AnalyticsResultHistory.module.css';

export interface IAnalyticsResultHistory {
  sampleTextProp: string;
  result: string[];
}

const AnalyticsResultHistory: React.FC<IAnalyticsResultHistory> = ({
  sampleTextProp,
  result,
}) => {
  return (
    <Timeline
      sx={{
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {result.map((data, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index !== result.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{data}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default AnalyticsResultHistory;
