import { useEffect, useState } from 'react';
import styles from './PatientStoryForm.module.css';
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography
} from '@mui/material';
import { FormDataService, FormTemplatesService } from 'src/tallulah-ts-client';
import ImageUpload from './components/ImageUpload';
import DocumentUpload from './components/DocumentUpload';

export interface IPatientStoryForm {}

const PatientStoryForm: React.FC<IPatientStoryForm> = ({}) => {
  const [formLayout, setFormLayout] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const handleFormDataChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'STRING':
      case 'EMAIL':
      case 'PHONE':
      case 'URL':
        return (
          <TextField
            name={field.name}
            fullWidth
            className={styles.inputStyle}
            type="text"
            placeholder={field.place_holder}
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
          />
        );
      case 'NUMBER':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="number"
            placeholder={field.place_holder}
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
          />
        );
      case 'DATE':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="date"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'TIME':
        return (
          <TextField
            name={field.name}
            fullWidth
            type="time"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'DATETIME':
        return (
          <TextField
            fullWidth
            type="datetime-local"
            required={field.required}
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'TEXTAREA':
        return (
          <TextField
            name={field.name}
            fullWidth
            multiline
            rows={6}
            placeholder={field.place_holder}
            required={field.required}
            onChange={handleFormDataChange}
            sx={{
              width: '100%'
            }}
            label={field.description}
            InputLabelProps={{ shrink: true }}
          />
        );
      case 'SELECT':
        return (
          <FormControl fullWidth>
            <InputLabel
              id={field.place_holder}
              sx={{
                backgroundColor: 'white',
                paddingX: '5px'
              }}
            >
              {field.place_holder}
            </InputLabel>
            <Select required={field.required} onChange={handleFormDataChange} labelId={field.place_holder} name={field.name}>
              {field.options.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'RADIO':
        return (
          <>
            <Typography>{field.description}</Typography>
            <FormControl component="fieldset">
              <RadioGroup aria-label={field.name} onChange={handleFormDataChange} row name={field.name}>
                {field.options.map((option: any) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        );
      case 'CHECKBOX':
        return (
          <>
            <Typography>{field.description}</Typography>
            {field.options.map((option: any) => (
              <FormControlLabel key={option} control={<Checkbox />} label={option} name={field.name} />
            ))}
          </>
        );
      case 'FILE':
        return <DocumentUpload />;
      case 'IMAGE':
        return <ImageUpload />;
      case 'VIDEO':
        return <DocumentUpload />;
      default:
        return null;
    }
  };

  const fetchFormTemplate = async () => {
    const res = await FormTemplatesService.getAllFormTemplates();
    const formTemplateId = res.templates[res.templates.length - 1]._id;
    const formLayout = await FormTemplatesService.getFormTemplate(formTemplateId);
    setFormLayout(formLayout);
  };

  useEffect(() => {
    fetchFormTemplate();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData);
    // create form object with key as field name and value as field value
    const form: any = {};
    formLayout.fields.forEach((field: any) => {
      form[field?.name] = formData[field.name];
    });
    console.log('form', form);
    try {
      await FormDataService.addFormData({
        form_template_id: formLayout._id,
        values: form
      });
    } catch (error) {
      console.log(error);
    }
  };

  const spanFullWidth = (field: any) => {
    const fullWidthTypes = ['TEXTAREA', 'FILE', 'IMAGE', 'VIDEO', 'CHECKBOX', 'RADIO'];
    return fullWidthTypes.includes(field.type);
  };

  if (!formLayout) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.gridContainer}>
          {formLayout?.fields.map((field: any) => (
            <Box
              key={field.name}
              className={`${styles.gridItem} ${spanFullWidth(field) ? styles.fullWidth : ''}`}
              sx={{
                width: '100%'
              }}
            >
              {renderField(field)}
            </Box>
          ))}
        </div>
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PatientStoryForm;
