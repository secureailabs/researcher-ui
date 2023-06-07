import { Box, Grid, Typography } from '@mui/material';
import styles from './DataModelColumnCard.module.css';

export interface IDataModelColumnCard {
  columnData: any;
}

const DataModelColumnCard: React.FC<IDataModelColumnCard> = ({ columnData }) => {
  return (
    <Box className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" component="p">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Name
            </Typography>
            {columnData.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Description
            </Typography>
            {columnData.description}
          </Typography>
        </Grid>
        {Object.keys(columnData.series_schema).map((key) => {
          if (['list_values', 'min', 'max', 'resolution', 'type', 'unit'].includes(key) && columnData.series_schema[key] !== null) {
            return (
              <Grid item xs={6}>
                <Typography variant="body1" component="p">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >
                    {key}
                  </Typography>
                  {columnData.series_schema[key]}
                </Typography>
              </Grid>
            );
          }
        })}
      </Grid>
    </Box>
  );
};

export default DataModelColumnCard;
