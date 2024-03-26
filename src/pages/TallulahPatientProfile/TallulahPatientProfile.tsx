import { Box, CircularProgress, Grid } from '@mui/material';
import styles from './TallulahPatientProfile.module.css';
import { useQuery } from 'react-query';
import { GetMultiplePatientProfiles_Out, GetPatientProfile_Out, PatientProfilesService } from 'src/tallulah-ts-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import SearchBar from 'src/components/SearchBar';
import PatientCard from './components/PatientCard';

export interface ITallulahPatientProfile {}

const TallulahPatientProfile: React.FC<ITallulahPatientProfile> = ({}) => {
  const [searchText, setSearchText] = useState('');
  const [paginationDetails, setPaginationDetails] = useState({
    count: 0,
    limit: 10,
    next: 0
  });

  const fetchPatientProfile = async () => {
    const res: GetMultiplePatientProfiles_Out = await PatientProfilesService.getAllPatientProfiles();
    if (res) {
      setPaginationDetails({
        count: res.count,
        limit: res?.limit || 10,
        next: res?.next || 0
      });
    }
    return res;
  };

  const patientProfileQuery = useQuery(['patientProfile'], fetchPatientProfile);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    patientProfileQuery.refetch();
  }, [searchText]);

  if (patientProfileQuery.isLoading) {
    return (
      <Box className={styles.loadingDiv}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.searchBarContainer}>
        <SearchBar placeholder="Search Patient Profiles" searchText={searchText} handleSearchChange={handleSearchChange} />
      </Box>
      <InfiniteScroll
        dataLength={paginationDetails.count}
        next={fetchPatientProfile}
        hasMore={patientProfileQuery.data !== undefined && patientProfileQuery.data?.patient_profiles?.length < paginationDetails.count}
        loader={<CircularProgress />}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          xs={12}
          lg={6}
          xl={6}
          sx={{
            paddingTop: '20px'
          }}
        >
          {patientProfileQuery.data?.patient_profiles?.map((patientProfile: GetPatientProfile_Out) => (
            <Grid item key={patientProfile._id} className={styles.patientProfile}>
              <PatientCard data={patientProfile} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default TallulahPatientProfile;
