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
import { FormDataService, FormMediaTypes, FormTemplatesService, GetMultipleFormTemplate_Out } from 'src/tallulah-ts-client';
import ImageUpload from './components/ImageUpload';
import DocumentUpload from './components/DocumentUpload';
import { Form } from 'react-router-dom';
import axios from 'axios';

export interface IPatientStoryForm {}

export type TImageFileUpload = {
  fieldName: string;
  files: File[];
};

export type TDocumentFileUpload = {
  fieldName: string;
  files: File[];
};

const PatientStoryForm: React.FC<IPatientStoryForm> = ({}) => {
  const [formLayout, setFormLayout] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [imageFiles, setImageFiles] = useState<TImageFileUpload[]>([]);
  const [documentFiles, setDocumentFiles] = useState<TDocumentFileUpload[]>([]);
  const [videoFiles, setVideoFiles] = useState<TDocumentFileUpload[]>([]);

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
        return <DocumentUpload fieldName={field.name} setDocumentFiles={setDocumentFiles} />;
      case 'IMAGE':
        return <ImageUpload fieldName={field.name} setImageFiles={setImageFiles} />;
      case 'VIDEO':
        return <DocumentUpload fieldName={field.name} setDocumentFiles={setVideoFiles} />;
      default:
        return null;
    }
  };

  const fetchFormTemplate = async () => {
    const res: GetMultipleFormTemplate_Out = await FormTemplatesService.getAllFormTemplates();
    // get the last form template
    const formTemplate = res.templates[res.templates.length - 1];
    setFormLayout(formTemplate);
  };

  useEffect(() => {
    fetchFormTemplate();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    console.log('form layout', formLayout);
    console.log('form data', formData);
    console.log('image files', imageFiles);
    console.log('document files', documentFiles);
    console.log('video files', videoFiles);

    // Prepare form data excluding media files
    const form: any = {};

    const mediaUploadPromises: any[] = [];

    Object.keys(formData).forEach((key) => {
      form[key] = formData[key];
    });

    console.log('checkoint 1');

    // media upload promises for all images in imageFile state which is of type TImageFileUpload[] and later populate the returned id to form[fieldName]
    imageFiles?.forEach((imageFile: TImageFileUpload) => {
      form[imageFile.fieldName] = [];
      imageFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'IMAGE', imageFile.fieldName));
      });
    });

    videoFiles?.forEach((videoFile: TDocumentFileUpload) => {
      form[videoFile.fieldName] = [];
      videoFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'VIDEO', videoFile.fieldName));
      });
    });

    documentFiles?.forEach((documentFile: TDocumentFileUpload) => {
      form[documentFile.fieldName] = [];
      documentFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'FILE', documentFile.fieldName));
      });
    });

    console.log('checkoint 2');

    try {
      const mediaUploadResults = await Promise.all(mediaUploadPromises);

      console.log('mediaUploadResults', mediaUploadResults);

      mediaUploadResults.forEach((mediaUploadResult: any) => {
        form[mediaUploadResult.fieldName].push(mediaUploadResult.id);
      });

      await FormDataService.addFormData({
        form_template_id: formLayout._id,
        values: form
      });
      // Handle successful submission (e.g., show message, redirect)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle form submission error
    }
  };

  const handleMediaUpload = async (file: any, type: string, fieldName: string) => {
    // Step 1: Get the upload URL and ID
    // get enum from FormMediaTypes => enum FormMediaTypes {FILE = 'FILE',IMAGE = 'IMAGE',VIDEO = 'VIDEO'}

    const typeEnum = type === 'FILE' ? FormMediaTypes.FILE : type === 'IMAGE' ? FormMediaTypes.IMAGE : FormMediaTypes.VIDEO;

    const response = await FormDataService.getUploadUrl(typeEnum);
    const { id, url } = response;

    // Step 2: Upload the file
    const uploadResponse = await axios({
      method: 'PUT',
      url: url,
      data: file,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'image/png'
      }
    });

    if (!uploadResponse) {
      throw new Error('Failed to upload media');
    }

    return { id, fieldName }; // or any other relevant data from the response
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
        <div>
          {formLayout?.field_groups.map((field: any) => (
            <Box
              key={field.name}
              sx={{
                marginY: '30px'
              }}
            >
              <Box
                sx={{
                  marginBottom: '20px'
                }}
              >
                <Typography variant="h5">{field.description}</Typography>
              </Box>
              <Box className={styles.gridContainer}>
                {field.fields.map((field: any) => (
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
              </Box>
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
