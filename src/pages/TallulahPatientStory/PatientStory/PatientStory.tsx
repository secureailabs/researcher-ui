import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import styles from './PatientStory.module.css';
import { useEffect, useState } from 'react';
import {
  FormDataService,
  FormTemplatesService,
  GetFormData_Out,
  GetMultipleFormData_Out,
  GetMultipleFormTemplate_Out
} from 'src/tallulah-ts-client';
import PatientCard from './components/PatientCard';
import { set } from 'react-hook-form';
import SearchBar from 'src/components/SearchBar';
import PatientDetailViewModal from './components/PatientDetailViewModal';

export interface IPatientStory {}

const PatientStory: React.FC<IPatientStory> = ({}) => {
  let formData: GetFormData_Out[] = [];

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<GetFormData_Out[]>([]); // filteredData is a subset of formData
  const [publishedFormId, setPublishedFormId] = useState<string>('');
  const [selectedPatientData, setSelectedPatientData] = useState<any>(null);
  const [isFormTemplateFetching, setIsFormTemplateFetching] = useState<boolean>(false);
  const [isFormDataFetching, setIsFormDataFetching] = useState<boolean>(false);

  const fetchFormData = async (formId: string) => {
    setIsFormDataFetching(true);
    try {
      const res: GetMultipleFormData_Out = await FormDataService.getAllFormData(formId);
      formData = res.form_data;
      setFilteredData(res.form_data);
    } catch (err) {
      console.log(err);
    }
    setIsFormDataFetching(false);
  };

  const fetchPublishedFormTemplate = async () => {
    setIsFormTemplateFetching(true);
    try {
      const res: GetMultipleFormTemplate_Out = await FormTemplatesService.getAllFormTemplates();
      // filter the published state
      const filteredData = res.templates.filter((formTemplate) => formTemplate.state === 'PUBLISHED');
      setPublishedFormId(filteredData[0]._id);
      fetchFormData(filteredData[0]._id);
    } catch (err) {
      console.log(err);
    }
    setIsFormTemplateFetching(false);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchPublishedFormTemplate();
  }, []);

  if (isFormTemplateFetching || isFormDataFetching) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          sx={{
            marginLeft: '1rem'
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          marginY: '2rem'
        }}
      >
        <SearchBar placeholder="Search Patient By Name, Tags or Journey " searchText={searchText} handleSearchChange={handleSearchChange} />
      </Box>
      <Grid container spacing={3}>
        {filteredData.map((patientData: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            onClick={() => {
              setOpenModal(true);
              setSelectedPatientData(patientData);
            }}
            className={styles.patientCardGridItem}
          >
            <PatientCard data={patientData} />
          </Grid>
        ))}
      </Grid>
      {selectedPatientData ? (
        <PatientDetailViewModal openModal={openModal} handleCloseModal={handleCloseModal} data={selectedPatientData} />
      ) : null}
    </Box>
  );
};

export default PatientStory;
