import { Box, CircularProgress, Grid, InputLabel, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
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
import { AnyAction } from 'redux';
import FilterChip from './components/FilterChip';
import Sort from './components/Sort';

export interface IPatientStory {}

export type PatientStoryFilter = {
  name: string;
  options: string[];
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const PatientStory: React.FC<IPatientStory> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<GetFormData_Out[]>([]);
  const [filteredData, setFilteredData] = useState<GetFormData_Out[]>([]); // filteredData is a subset of formData
  const [formTemplate, setFormTemplate] = useState<GetFormTemplate_Out>();
  const [selectedPatientData, setSelectedPatientData] = useState<GetFormData_Out>();
  const [isFormTemplateFetching, setIsFormTemplateFetching] = useState<boolean>(false);
  const [isFormDataFetching, setIsFormDataFetching] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<any>({});
  const [tabValue, setTabValue] = useState<number>(0);
  const [publishedTemplateList, setPublishedTemplateList] = useState<GetFormTemplate_Out[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('creation_time');
  const [sortDirection, setSortDirection] = useState<number>(-1);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const templateNameString = formTemplate?.card_layout?.name || 'TEMPLATE0';
  const templateNameEnum = TemplateNames[templateNameString as keyof typeof TemplateNames];

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
      const filterFormTemplateId = formId;
      const filterSkip = 0;
      const filterLimit = 200;
      const filterSortKey = sortKey;
      const filterSortDirection = sortDirection;
      const filterRequestBody = selectedFilter;
      const res: GetMultipleFormData_Out = await FormDataService.getAllFormData(
        filterFormTemplateId,
        filterSkip,
        filterLimit,
        filterSortKey,
        filterSortDirection,
        filterRequestBody
      );
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
      setPublishedTemplateList(filteredData);
      setSelectedTemplateId(filteredData[0].id);
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
    const res = await FormDataService.searchFormData(selectedTemplateId, text);
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

  useEffect(() => {
    if (selectedTemplateId) {
      fetchFormData(selectedTemplateId);
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (selectedTemplateId) {
      fetchFormData(selectedTemplateId);
    }
  }, [sortKey, sortDirection]);

  const TemplateSelector = () => {
    return (
      <Box className={styles.templateSelectorDiv}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTemplateId}
          onChange={(event: any) => {
            setSelectedTemplateId(event.target.value as string);
            // update new form template
            const selectedTemplate = publishedTemplateList.find((template) => template.id === event.target.value);
            setFormTemplate(selectedTemplate);
            // fetch form data
            fetchFormData(event.target.value);
            // clear filters
            setSelectedFilter({});
          }}
          fullWidth
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            marginTop: '1rem'
          }}
        >
          {publishedTemplateList?.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  };

  return (
    <Box className={styles.container}>
      <Box>
        <TemplateSelector />
      </Box>
      <Box className={styles.patientStoryContainer}>
        <Box className={styles.searchContainer}>
          <SearchBar
            placeholder="Search Patient By Name, Tags or Journey "
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Box>
        <Box className={styles.filterContainer}>
          <Filter filterObjects={getFilterObjects()} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
          <Sort sortDirection={sortDirection} setSortDirection={setSortDirection} sortKey={sortKey} setSortKey={setSortKey} />
        </Box>
        <Box>
          {/* get keys of selectedFilter and loop to disl;ay all the filter tags */}
          <Box
            className={styles.filterTagsContainer}
            sx={{
              display: 'flex',
              marginBottom: '1rem'
            }}
          >
            {Object.keys(selectedFilter).map((key) =>
              selectedFilter[key].map((tag: string) => {
                return (
                  <Box key={key} className={styles.filterTag}>
                    <FilterChip filterTag={tag} filterKey={key} setFilters={setSelectedFilter} />
                  </Box>
                );
              })
            )}
          </Box>
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
    </Box>
  );
};

export default PatientStory;
