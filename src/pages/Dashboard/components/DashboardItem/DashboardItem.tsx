import { DashboardWidget } from 'src/tallulah-ts-client';
import styles from './DashboardItem.module.css';
import { SignalCellularNullSharp } from '@mui/icons-material';
import PieChart from 'src/components/ElasticSearchDashboardComponents/PieChart';
import { Box, Typography } from '@mui/material';
import TextMetricLayout1 from 'src/components/ElasticSearchDashboardComponents/TextMetricLayout1';
import BarchartItem from 'src/components/ElasticSearchDashboardComponents/BarchartItem';
import LinechartItem from 'src/components/ElasticSearchDashboardComponents/LinechartItem';

export interface IDashboardItem {
  widget: DashboardWidget;
  response?: any;
}

const ItemDiv = ({ children, widget }: { children: React.ReactNode; widget: DashboardWidget }) => (
  <div className={styles.dashboardItem}>
    <Box className={styles.dashboardItemContentDiv}>{children}</Box>
    <Box className={styles.dashboardItemTitleDiv}>
      <Typography variant="h6" className={styles.dashboardItemTitle}>
        {widget.name}
      </Typography>
    </Box>
  </div>
);

const DashboardItem: React.FC<IDashboardItem> = ({ widget, response }) => {
  if (!response) return null;

  switch (widget.type) {
    case 'PIE_CHART':
      return (
        <ItemDiv widget={widget}>
          <PieChart data_query={widget.data_query} response={response} />
        </ItemDiv>
      );
    case 'TEXT':
      return (
        <ItemDiv widget={widget}>
          <TextMetricLayout1 data_query={widget.data_query} response={response} />
        </ItemDiv>
      );
    case 'BAR_CHART':
      return (
        <ItemDiv widget={widget}>
          <BarchartItem data_query={widget.data_query} response={response} />
        </ItemDiv>
      );
    case 'LINE_CHART':
      return (
        <ItemDiv widget={widget}>
          <LinechartItem data_query={widget.data_query} response={response} />
        </ItemDiv>
      );
    default:
      return null;
  }
};

export default DashboardItem;
