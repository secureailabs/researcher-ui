import styles from './BarchartItem.module.css';
import { BarChart } from '@mui/x-charts/BarChart';

export interface IBarchartItem {
  data_query: any;
  response?: any;
}

const BarchartItem: React.FC<IBarchartItem> = ({ response }) => {
  console.log('response', response);
  const response_array = Object.keys(response).map((key) => {
    return response[key];
  });

  const keys = response_array[0].buckets.map((bucket: any) => bucket.key);
  const counts = response_array[0].buckets.map((bucket: any) => bucket.doc_count);

  if (keys.every((key: any) => !isNaN(key))) {
    keys.sort((a: any, b: any) => a - b);
  }

  return (
    // create a bar chart with the response object
    <BarChart
      series={[
        {
          data: counts
        }
      ]}
      height={290}
      width={400}
      xAxis={[
        {
          data: keys.map((key: any) => `Age ${key}`),
          scaleType: 'band'
        }
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default BarchartItem;
