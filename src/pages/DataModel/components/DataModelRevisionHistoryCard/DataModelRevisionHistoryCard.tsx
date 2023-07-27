import { Box, Grid, Typography } from '@mui/material';
import styles from './DataModelRevisionHistoryCard.module.css';
import { connect } from 'react-redux';
import { DataModelVersionBasicInfo } from 'src/client';

export interface IDataModelRevisionHistoryCard {
  revisionData: DataModelVersionBasicInfo;
}

const DataModelRevisionHistoryCard: React.FC<IDataModelRevisionHistoryCard> = ({ revisionData }) => {
  return (
    <Box className={styles.container}>
      <Grid container spacing={2}>
        {Object.entries(revisionData).map(([key, value]) => {
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
                {value}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(DataModelRevisionHistoryCard);
