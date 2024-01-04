import { Box, Grid } from '@mui/material';
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

export interface IPatientStory {}

const PatientStory: React.FC<IPatientStory> = ({}) => {
  let formData: GetFormData_Out[] = [];

  const [filteredData, setFilteredData] = useState<GetFormData_Out[]>([]); // filteredData is a subset of formData
  const [publishedFormId, setPublishedFormId] = useState<string>('');

  const fetchFormData = async (formId: string) => {
    try {
      const res: GetMultipleFormData_Out = await FormDataService.getAllFormData(formId);
      formData = res.form_data;
      setFilteredData(res.form_data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPublishedFormTemplate = async () => {
    try {
      const res: GetMultipleFormTemplate_Out = await FormTemplatesService.getAllFormTemplates();
      // filter the published state
      const filteredData = res.templates.filter((formTemplate) => formTemplate.state === 'PUBLISHED');
      setPublishedFormId(filteredData[0]._id);
      fetchFormData(filteredData[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPublishedFormTemplate();
  }, []);

  return (
    <Box className={styles.container}>
      <Grid container spacing={3}>
        {filteredData.map((patientData: any) => (
          <Grid item xs={12} sm={6} md={6} lg={6} onClick={() => {}} className={styles.patientCardGridItem}>
            <PatientCard data={patientData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PatientStory;
