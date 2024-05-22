import { Box, CircularProgress, Grid, LinearProgress, Pagination, Typography } from '@mui/material';
import styles from './TallulahETapestry.module.css';
import { useQuery } from 'react-query';
import {
  EtapestryDataService,
  EtapestryRepositoriesService,
  GetETapestryData_Out,
  GetETapestryRepository_Out,
  GetMultipleETapestryData_Out,
  GetMultipleETapestryRepository_Out
} from 'src/tallulah-ts-client';
import { useEffect, useState } from 'react';
import SearchBar from 'src/components/SearchBar';
import PatientCard from './components/PatientCard';
import PatientProfileViewModal from './components/PatientProfileViewModal';
import PatientDetailEditModal from './components/PatientDetailEditModal';

export interface ITallulahETapestry {}

const INITIAL_PAGINATION_DETAILS = {
  count: 0,
  limit: 20,
  next: 0
};

const TallulahETapestry: React.FC<ITallulahETapestry> = ({}) => {
  const [searchText, setSearchText] = useState('');
  const [paginationDetails, setPaginationDetails] = useState({
    count: 0,
    limit: 20,
    next: 0
  });
  const [patientProfiles, setPatientProfiles] = useState<GetETapestryData_Out[]>([]);
  const [profileRepository, setProfileRepository] = useState<GetETapestryRepository_Out>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPatientDetailEditModal, setOpenPatientDetailEditModal] = useState<boolean>(false);

  const [selectedPatientData, setSelectedPatientData] = useState<GetETapestryData_Out>();

  const fetchPatientProfile = async () => {
    setLoading(true);
    try {
      const resPatientProfileRepository: GetMultipleETapestryRepository_Out =
        await EtapestryRepositoriesService.getAllEtapestryRepositories();
      setProfileRepository(resPatientProfileRepository.repositories[0]);
      const repositoryId = resPatientProfileRepository.repositories[0].id;
      const res: GetMultipleETapestryData_Out = await EtapestryDataService.getAllEtapestryData(
        repositoryId,
        (page - 1) * INITIAL_PAGINATION_DETAILS.limit,
        INITIAL_PAGINATION_DETAILS.limit,
        'creation_time',
        -1
      );
      if (res) {
        setPatientProfiles([...res.etapestry_data]);
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

  const searchETapestryData = async () => {
    setLoading(true);
    try {
      const res = await EtapestryDataService.searchEtapestryData(profileRepository?.id || '', searchText);
      if (res) {
        setPatientProfiles([...res.hits?.hits?.map((hit: any) => hit._source)]);
        setPaginationDetails({
          count: res.hits?.hits.length || 0,
          limit: res.hits?.hits.length || 0,
          next: res.hits?.hits.length || 0
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
    if (searchText) {
      searchETapestryData();
    } else {
      fetchPatientProfile();
    }
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
        <SearchBar placeholder="Search Profiles" searchText={searchText} handleSearchChange={handleSearchChange} />
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
        {patientProfiles?.map((patientProfile: GetETapestryData_Out) => (
          <Grid
            item
            key={patientProfile.id}
            className={styles.patientProfile}
            onClick={() => {
              setOpenModal(true);
              setSelectedPatientData(patientProfile);
            }}
            xs={12}
            md={6}
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
          No profiles found
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

export default TallulahETapestry;
