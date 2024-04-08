import { Box, CircularProgress, Grid, LinearProgress, Pagination, Typography } from '@mui/material';
import styles from './TallulahPatientProfile.module.css';
import { useQuery } from 'react-query';
import {
  GetMultiplePatientProfileRepository_Out,
  GetMultiplePatientProfiles_Out,
  GetPatientProfileRepository_Out,
  GetPatientProfile_Out,
  PatientProfileRepositoriesService,
  PatientProfilesService
} from 'src/tallulah-ts-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import SearchBar from 'src/components/SearchBar';
import PatientCard from './components/PatientCard';
import PatientProfileViewModal from './components/PatientProfileViewModal';

export interface ITallulahPatientProfile {}

const TallulahPatientProfile: React.FC<ITallulahPatientProfile> = ({}) => {
  const [searchText, setSearchText] = useState('');
  const [paginationDetails, setPaginationDetails] = useState({
    count: 0,
    limit: 20,
    next: 0
  });
  const [patientProfiles, setPatientProfiles] = useState<GetPatientProfile_Out[]>([]);
  const [profileRepository, setProfileRepository] = useState<GetPatientProfileRepository_Out>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedPatientData, setSelectedPatientData] = useState<GetPatientProfile_Out>();

  const fetchPatientProfile = async () => {
    setLoading(true);
    try {
      const resPatientProfileRepository: GetMultiplePatientProfileRepository_Out =
        await PatientProfileRepositoriesService.getAllPatientProfileRepositories();
      setProfileRepository(resPatientProfileRepository.repositories[0]);
      const repositoryId = resPatientProfileRepository.repositories[0].id;
      const res: GetMultiplePatientProfiles_Out = await PatientProfilesService.getAllPatientProfiles(
        repositoryId,
        (page - 1) * paginationDetails.limit,
        paginationDetails.limit,
        'creation_time',
        -1
      );
      if (res) {
        setPatientProfiles([...res.patient_profiles]);
        setPaginationDetails({
          count: res.count,
          limit: res?.limit || 10,
          next: res?.next || 0
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRefresh = () => {
    fetchPatientProfile();
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchPatientProfile();
  }, [searchText]);

  useEffect(() => {
    fetchPatientProfile();
  }, [page]);

  const PaginationComponent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: '2rem'
      }}
    >
      <Pagination
        count={Math.ceil(paginationDetails.count / paginationDetails.limit)}
        color="primary"
        onChange={(event, page) => {
          setPage(page);
        }}
      />
      <Box>
        <Typography variant="caption" color="textSecondary">
          {paginationDetails.count} patient profiles found
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.searchBarContainer}>
        <SearchBar placeholder="Search Patient Profiles" searchText={searchText} handleSearchChange={handleSearchChange} />
      </Box>
      {loading && (
        <Box className={styles.loading}>
          <LinearProgress />
        </Box>
      )}
      {paginationDetails.count > 0 ? PaginationComponent : null}

      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          paddingTop: '2rem'
        }}
      >
        {patientProfiles?.map((patientProfile: GetPatientProfile_Out) => (
          <Grid
            item
            key={patientProfile._id}
            className={styles.patientProfile}
            onClick={() => {
              setOpenModal(true);
              setSelectedPatientData(patientProfile);
            }}
          >
            <PatientCard data={patientProfile} />
          </Grid>
        ))}
      </Box>

      {paginationDetails.count > 0 ? (
        PaginationComponent
      ) : patientProfiles.length === 0 && !loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}
        >
          No patient profiles found
        </Box>
      ) : null}

      {selectedPatientData ? (
        <PatientProfileViewModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          data={selectedPatientData}
          handleRefresh={handleRefresh}
        />
      ) : null}
    </Box>
  );
};

export default TallulahPatientProfile;
