import { PieChart } from '@mui/x-charts/PieChart';
import styles from './PieChart.module.css';

export interface IPieChartItem {
  data_query: any;
  response?: any;
}

const PieChartItem: React.FC<IPieChartItem> = ({ response }) => {
  const size = {
    height: 120
  };
  const response_array = Object.keys(response).map((key) => {
    return response[key];
  });

  const data = response_array[0].buckets.map((bucket: any) => {
    return {
      id: bucket.key,
      value: bucket.doc_count,
      label: bucket.key
    };
  });

  return (
    <PieChart
      series={[
        {
          data: data
        }
      ]}
      width={400}
      height={200}
    />
  );
};

export default PieChartItem;
