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
  Typography,
  CircularProgress
} from '@mui/material';

import {
  FormDataService,
  FormMediaTypes,
  FormTemplatesService,
  GetFormTemplate_Out,
  GetMultipleFormTemplate_Out
} from 'src/tallulah-ts-client';

import ImageUpload from './components/ImageUpload';
import DocumentUpload from './components/DocumentUpload';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoUpload from './components/VideoUpload';
import useNotification from 'src/hooks/useNotification';

export interface IPatientStoryForm {}

export type TImageFileUpload = {
  fieldName: string;
  files: File[];
};

export type TDocumentFileUpload = {
  fieldName: string;
  files: File[];
};

export type TVideoUpload = {
  fieldName: string;
  files: File[];
};

const spanFullWidth = (field: any) => {
  const fullWidthTypes = ['TEXTAREA', 'FILE', 'IMAGE', 'VIDEO', 'CHECKBOX', 'RADIO'];
  return fullWidthTypes.includes(field.type);
};

const PatientStoryForm: React.FC<IPatientStoryForm> = ({}) => {
  const [formLayout, setFormLayout] = useState<GetFormTemplate_Out>();
  const [formData, setFormData] = useState<any>({});
  const [imageFiles, setImageFiles] = useState<TImageFileUpload[]>([]);
  const [documentFiles, setDocumentFiles] = useState<TDocumentFileUpload[]>([]);
  const [videoFiles, setVideoFiles] = useState<TDocumentFileUpload[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isFormTemplateFetching, setIsFormTemplateFetching] = useState<boolean>(false);

  const [sendNotification] = useNotification();
  let { id } = useParams();

  const getCorrespondingLabel = (fieldName: string) => {
    const field = formLayout?.field_groups?.flatMap((fieldGroup: any) => fieldGroup.fields).find((field: any) => field?.name === fieldName);
    return field?.label;
  };

  const getCorrespondingType = (fieldName: string) => {
    const field = formLayout?.field_groups?.flatMap((fieldGroup: any) => fieldGroup.fields).find((field: any) => field?.name === fieldName);
    return field?.type;
  };

  const handleFormDataChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: {
        value: event.target.value,
        label: getCorrespondingLabel(event.target.name),
        type: getCorrespondingType(event.target.name)
      }
    });
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
        return (
          <>
            <Typography>{field.description}</Typography>
            <DocumentUpload fieldName={field.name} setDocumentFiles={setDocumentFiles} />
          </>
        );
      case 'IMAGE':
        return (
          <>
            <Typography>{field.description}</Typography>
            <ImageUpload fieldName={field.name} setImageFiles={setImageFiles} />
          </>
        );
      case 'VIDEO':
        return (
          <>
            <Typography>{field.description}</Typography>
            <VideoUpload fieldName={field.name} setVideoFiles={setVideoFiles} />
          </>
        );
      default:
        return null;
    }
  };

  const fetchFormTemplateById = async (id: string) => {
    setIsFormTemplateFetching(true);
    try {
      const res: GetFormTemplate_Out = await FormTemplatesService.getPublishedFormTemplate(id);
      setFormLayout(res);
    } catch (err) {
      console.log(err);
    }
    setIsFormTemplateFetching(false);
  };

  const fetchFormTemplate = async () => {
    setIsFormTemplateFetching(true);
    try {
      const res: GetMultipleFormTemplate_Out = await FormTemplatesService.getAllFormTemplates();
      const filteredData = res.templates.filter((formTemplate: any) => formTemplate.state === 'PUBLISHED');
      const formTemplate = filteredData[0];
      setFormLayout(formTemplate);
    } catch (err) {
      console.log(err);
    }
    setIsFormTemplateFetching(false);
  };

  useEffect(() => {
    if (id === undefined) {
      fetchFormTemplate();
    } else {
      fetchFormTemplateById(id);
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const form: any = {};

    const mediaUploadPromises: any[] = [];

    Object.keys(formData).forEach((key) => {
      form[key] = formData[key];
    });

    imageFiles?.forEach((imageFile: TImageFileUpload) => {
      form[imageFile.fieldName] = {
        value: [],
        label: imageFile.fieldName,
        type: 'IMAGE'
      };
      imageFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'IMAGE', imageFile.fieldName));
      });
    });

    videoFiles?.forEach((videoFile: TDocumentFileUpload) => {
      form[videoFile.fieldName] = {
        value: [],
        label: videoFile.fieldName,
        type: 'VIDEO'
      };
      videoFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'VIDEO', videoFile.fieldName));
      });
    });

    documentFiles?.forEach((documentFile: TDocumentFileUpload) => {
      form[documentFile.fieldName] = {
        value: [],
        label: documentFile.fieldName,
        type: 'FILE'
      };
      documentFile.files.forEach((file: File) => {
        mediaUploadPromises.push(handleMediaUpload(file, 'FILE', documentFile.fieldName));
      });
    });

    try {
      setUploading(true);
      const mediaUploadResults = await Promise.all(mediaUploadPromises);

      mediaUploadResults.forEach((mediaUploadResult: any) => {
        form[mediaUploadResult.fieldName].value.push({
          id: mediaUploadResult.id,
          type: mediaUploadResult.fileType,
          name: mediaUploadResult.fileName
        });
      });

      await FormDataService.addFormData({
        form_template_id: formLayout?._id as string,
        values: form
      });
      sendNotification({
        msg: "Patient's story submitted successfully.",
        variant: 'success'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setUploading(false);
  };

  const handleMediaUpload = async (file: any, type: string, fieldName: string) => {
    const typeEnum = type === 'FILE' ? FormMediaTypes.FILE : type === 'IMAGE' ? FormMediaTypes.IMAGE : FormMediaTypes.VIDEO;

    const response = await FormDataService.getUploadUrl(typeEnum);
    const { id, url } = response;

    const uploadResponse = await axios({
      method: 'PUT',
      url: url,
      data: file,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type
      }
    });

    if (!uploadResponse) {
      throw new Error('Failed to upload media');
    }

    return { id, fieldName, fileType: file.type, fileName: file.name }; // or any other relevant data from the response
  };

  if (isFormTemplateFetching) {
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
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      {uploading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" color="white">
            Uploading. Please wait ...
          </Typography>
          <Typography variant="h5" color="white">
            It may take a while, kindly do not refresh the page.
          </Typography>
        </Box>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          {formLayout?.field_groups?.map((field: any) => (
            <Box
              key={field.name}
              sx={{
                marginY: '30px'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  marginBottom: '20px'
                }}
              >
                {field.description}
              </Typography>

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
        {formLayout ? (
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        ) : null}
      </form>
    </Box>
  );
};

export default PatientStoryForm;
