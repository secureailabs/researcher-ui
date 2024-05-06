import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import styles from './PatientStory.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  FormDataService,
  FormTemplatesService,
  GetFormData_Out,
  GetFormTemplate_Out,
  GetMultipleFormData_Out,
  GetMultipleFormTemplate_Out
} from 'src/tallulah-ts-client';
import PatientCard from './components/PatientCard';
import SearchBar from 'src/components/SearchBar';
import PatientDetailViewModal from './components/PatientDetailViewModal';
import CardTemplates from './components/CardTemplates';
import { TemplateNames } from './components/CardTemplates/CardTemplates';
import Filter from './components/Filter';

export interface IPatientStory {}

export type PatientStoryFilter = {
  name: string;
  options: string[];
};

const PatientStory: React.FC<IPatientStory> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<GetFormData_Out[]>([]);
  const [filteredData, setFilteredData] = useState<GetFormData_Out[]>([]); // filteredData is a subset of formData
  const [publishedFormId, setPublishedFormId] = useState<string>('');
  const [formTemplate, setFormTemplate] = useState<GetFormTemplate_Out>();
  const [selectedPatientData, setSelectedPatientData] = useState<GetFormData_Out>();
  const [isFormTemplateFetching, setIsFormTemplateFetching] = useState<boolean>(false);
  const [isFormDataFetching, setIsFormDataFetching] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<any>({});

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const templateNameString = formTemplate?.card_layout?.name || 'TEMPLATE0';
  const templateNameEnum = TemplateNames[templateNameString as keyof typeof TemplateNames];

  console.log('selectedFilter', selectedFilter);

  const getFilterObjects = () => {
    // flat map the field groups to get the fields and create an array with the field names and options
    const fields = formTemplate?.field_groups?.flatMap((fieldGroup) => fieldGroup.fields);
    const filterObject: PatientStoryFilter[] = [];
    fields?.forEach((field) => {
      if (field?.type === 'SELECT' || field?.type === 'RADIO' || field?.type === 'CHECKBOX') {
        const options = field?.options || [];
        filterObject.push({ name: field.name, options });
      }
    });
    return filterObject;
  };

  const fetchFormData = async (formId: string) => {
    setIsFormDataFetching(true);
    try {
      const res: GetMultipleFormData_Out = await FormDataService.getAllFormData(formId);
      setFormData(res.form_data);
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
      const filteredData = res.templates.filter((formTemplate: any) => formTemplate.state === 'PUBLISHED');
      setPublishedFormId(filteredData[0].id);
      setFormTemplate(filteredData[0]);
      fetchFormData(filteredData[0].id);
    } catch (err) {
      console.log(err);
    }
    setIsFormTemplateFetching(false);
  };

  const handleRefresh = () => {
    fetchPublishedFormTemplate();
  };

  const fetchSearchResults = async (text: string) => {
    setIsFormDataFetching(true);
    const res = await FormDataService.searchFormData(publishedFormId, text);
    const data = res.hits.hits.map((hit: any) => hit._id);
    const newfilteredData = formData.filter((item: GetFormData_Out) => data.includes(item.id));
    setFilteredData(newfilteredData);
    setIsFormDataFetching(false);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (searchText === undefined) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchText === '' || searchText === undefined) {
        setFilteredData(formData);
      } else {
        fetchSearchResults(searchText);
      }
    }, 500); // 500ms delay
  }, [searchText]); // Effect runs on searchText change

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchPublishedFormTemplate();
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.searchContainer}>
        <SearchBar placeholder="Search Patient By Name, Tags or Journey " searchText={searchText} handleSearchChange={handleSearchChange} />
        <Filter filterObjects={getFilterObjects()} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
      </Box>
      {isFormTemplateFetching || isFormDataFetching ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginY: '2rem'
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
      ) : null}

      {filteredData.length === 0 && !isFormTemplateFetching && !isFormDataFetching ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginY: '2rem'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginLeft: '1rem'
            }}
          >
            No Patient Story Found
          </Typography>
        </Box>
      ) : null}

      <Grid container spacing={3}>
        {filteredData?.map((patientData: GetFormData_Out) => (
          <Grid
            item
            key={patientData.id}
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
            <CardTemplates data={patientData} templateName={templateNameEnum} formTemplate={formTemplate} />
          </Grid>
        ))}
      </Grid>
      {selectedPatientData ? (
        <PatientDetailViewModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          data={selectedPatientData as GetFormData_Out}
          handleRefresh={handleRefresh}
        />
      ) : null}
    </Box>
  );
};

export default PatientStory;
