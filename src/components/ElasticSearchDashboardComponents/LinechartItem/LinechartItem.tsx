import { LineChart } from '@mui/x-charts/LineChart';
import styles from './Linechartitem.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { formatDateTimeEpoch } from 'src/utils/helper';

export interface ILinechartitem {
  data_query: any;
  response?: any;
}

const Linechartitem: React.FC<ILinechartitem> = ({ response }) => {
  const response_array = Object.keys(response).map((key) => {
    return response[key];
  });

  const keys = response_array[0].buckets.map((bucket: any) => formatDateTimeEpoch(bucket.key));
  const counts = response_array[0].buckets.map((bucket: any) => bucket.doc_count);

  return (
    // create a bar chart with the response object
    <LineChart
      xAxis={[{ data: keys, scaleType: 'band' }]}
      series={[
        {
          data: counts
        }
      ]}
      width={400}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
    />
  );
};

export default Linechartitem;
