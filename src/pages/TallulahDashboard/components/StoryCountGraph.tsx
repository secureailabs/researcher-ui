import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { color } from 'framer-motion';


const counts = [24, 40, 67, 94, 110, 130, 133, 140, 150, 156, 177];
const dates = [
  'Nov 2022',
  'Dec 2022',
  'Jan 2023',
  'Feb 2023',
  'Mar 2023',
  'Apr 2023',
  'May 2023',
  'Jun 2023',
  'Jul 2023',
  'Aug 2023',
  'Sep 2023',
];

const StoryCountGraph: React.FC = () => {
  return (
    <LineChart
      width={800}
      height={300}
      legend= {{ hidden: true }}
      series={[
        { data: counts, label: 'stories', color: '#1070a1' },
      ]}
      xAxis={[{ scaleType: 'point', data: dates }]}
    />
  );
};

export default StoryCountGraph;
