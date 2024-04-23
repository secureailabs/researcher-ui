import { DashboardWidget } from 'src/tallulah-ts-client';
import styles from './DashboardItem.module.css';
import { SignalCellularNullSharp } from '@mui/icons-material';
import PieChart from 'src/components/ElasticSearchDashboardComponents/PieChart';

export interface IDashboardItem {
  widget: DashboardWidget;
  response?: any;
}

const ItemDiv = ({ children }: { children: React.ReactNode }) => <div className={styles.dashboardItem}>{children}</div>;

const DashboardItem: React.FC<IDashboardItem> = ({ widget, response }) => {
  console.log('widget', widget);
  console.log('response', response);
  if (!response) return null;

  switch (widget.type) {
    case 'PIE_CHART':
      return (
        <ItemDiv>
          <PieChart data_query={widget.data_query} response={response} />
        </ItemDiv>
      );

    default:
      return null;
  }
};

export default DashboardItem;
