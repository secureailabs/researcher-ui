import { useEffect, useState } from 'react';
import styles from './FormBuilder.module.css';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormPreviewModal from './FormPreviewModal';
import { useParams } from 'react-router-dom';
import { FormTemplatesService } from 'src/tallulah-ts-client';

export interface IFormBuilder {}

const fieldTypes = [
  'STRING',
  'NUMBER',
  'DATE',
  'TIME',
  'DATETIME',
  'EMAIL',
  'PHONE',
  'URL',
  'TEXTAREA',
  'SELECT',
  'RADIO',
  'CHECKBOX',
  'FILE',
  'IMAGE',
  'VIDEO',
  'CONSENT_CHECKBOX'
];

const FormBuilder: React.FC<IFormBuilder> = () => {
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    field_groups: []
  });

  const [newFieldGroup, setNewFieldGroup] = useState<any>({
    name: '',
    description: ''
  });

  const [newField, setNewField] = useState<any>({
    name: '',
    label: '',
    description: '',
    place_holder: '',
    type: 'STRING',
    required: false,
    options: [],
    private: false
  });

  let { id } = useParams();

  const fetchFormTemplate = async (id: any) => {
    try {
      const res = await FormTemplatesService.getFormTemplate(id);
      const newForm = {
        name: res.name,
        description: res.description,
        field_groups: res.field_groups
      };
      setForm(newForm);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClosePreviewModal = () => {
    setOpenPreviewModal(false);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFieldGroupChange = (e: any) => {
    const { name, value } = e.target;
    setNewFieldGroup({ ...newFieldGroup, [name]: value });
  };

  const [optionsInput, setOptionsInput] = useState<any>('');

  const handleFieldChange = (e: any, groupIndex: any, fieldIndex: any) => {
    const { name, value, type, checked } = e.target;
    const updatedFieldGroups = [...form.field_groups];
    const updatedFields = [...updatedFieldGroups[groupIndex].fields];
    const updatedField = {
      ...updatedFields[fieldIndex],
      [name]: type === 'checkbox' ? checked : value
    };
    updatedFields[fieldIndex] = updatedField;
    updatedFieldGroups[groupIndex].fields = updatedFields;
    setForm({ ...form, field_groups: updatedFieldGroups });
  };

  const addFieldGroup = () => {
    setForm({
      ...form,
      field_groups: [...form.field_groups, { ...newFieldGroup, fields: [{ ...newField }] }]
    });
    setNewFieldGroup({ name: '', description: '' });
    setNewField({
      name: '',
      label: '',
      description: '',
      place_holder: '',
      type: 'STRING',
      required: false,
      options: [],
      private: false
    });
    setOptionsInput('');
  };

  const addFieldToGroup = (groupIndex: any) => {
    const updatedFieldGroups = [...form.field_groups];
    updatedFieldGroups[groupIndex].fields = [...updatedFieldGroups[groupIndex].fields, { ...newField }];
    setForm({ ...form, field_groups: updatedFieldGroups });
    setNewField({
      name: '',
      label: '',
      description: '',
      place_holder: '',
      type: 'STRING',
      required: false,
      options: [],
      private: false
    });
  };

  const removeFieldGroup = (groupIndex: any) => {
    const updatedFieldGroups = [...form.field_groups];
    updatedFieldGroups.splice(groupIndex, 1);
    setForm({ ...form, field_groups: updatedFieldGroups });
  };

  const removeField = (groupIndex: any, fieldIndex: any) => {
    const updatedFieldGroups = [...form.field_groups];
    updatedFieldGroups[groupIndex].fields.splice(fieldIndex, 1);
    setForm({ ...form, field_groups: updatedFieldGroups });
  };

  const handleSubmit = () => {
    console.log('Form Template:', JSON.stringify(form, null, 2));
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchFormTemplate(id);
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Form Builder
      </Typography>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Typography variant="h6" gutterBottom>
          Form Information
        </Typography>
        <TextField label="Form Name" name="name" value={form.name} onChange={handleFormChange} fullWidth margin="normal" />
        <TextField
          label="Form Description"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
        />
      </Paper>
      {form.field_groups.map((group: any, groupIndex: any) => (
        <Paper key={groupIndex} style={{ padding: 16, marginBottom: 16 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Section {groupIndex + 1}: {group.name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="secondary" onClick={() => removeFieldGroup(groupIndex)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            label="Section Name"
            name="name"
            value={group.name}
            onChange={(e) => {
              const updatedFieldGroups = [...form.field_groups];
              updatedFieldGroups[groupIndex].name = e.target.value;
              setForm({ ...form, field_groups: updatedFieldGroups });
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Section Description"
            name="description"
            value={group.description}
            onChange={(e) => {
              const updatedFieldGroups = [...form.field_groups];
              updatedFieldGroups[groupIndex].description = e.target.value;
              setForm({ ...form, field_groups: updatedFieldGroups });
            }}
            fullWidth
            margin="normal"
          />
          {group.fields.map((field: any, fieldIndex: any) => (
            <Box key={fieldIndex} className={styles.fieldContainer}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" gutterBottom>
                    Field {fieldIndex + 1}: {field.name}
                  </Typography>
                  <IconButton color="secondary" onClick={() => removeField(groupIndex, fieldIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Field Name"
                    name="name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Field Label"
                    name="label"
                    value={field.label}
                    onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Field Description"
                    name="description"
                    value={field.description}
                    onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Field Placeholder"
                    name="place_holder"
                    value={field.place_holder}
                    onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Field Type</InputLabel>
                    <Select name="type" value={field.type} onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}>
                      {fieldTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {['SELECT', 'RADIO', 'CHECKBOX', 'CONSENT_CHECKBOX'].includes(field.type) && (
                    <TextField
                      label="Options (comma separated)"
                      name="options"
                      value={field.options.join(', ')}
                      onChange={(e) => {
                        const options = e.target.value.split(',').map((opt) => opt.trim());
                        handleFieldChange({ target: { name: 'options', value: options } }, groupIndex, fieldIndex);
                      }}
                      fullWidth
                      margin="normal"
                    />
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.required}
                        onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                        name="required"
                        color="primary"
                      />
                    }
                    label="Required"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.private}
                        onChange={(e) => handleFieldChange(e, groupIndex, fieldIndex)}
                        name="private"
                        color="primary"
                      />
                    }
                    label="Private"
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px'
            }}
            onClick={() => addFieldToGroup(groupIndex)}
          >
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
            <Typography variant="body1" gutterBottom>
              Add New Field
            </Typography>
          </Box>
        </Paper>
      ))}
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Typography variant="h6" gutterBottom>
          Add New Field Group
        </Typography>
        <TextField label="Group Name" name="name" value={newFieldGroup.name} onChange={handleFieldGroupChange} fullWidth margin="normal" />
        <TextField
          label="Group Description"
          name="description"
          value={newFieldGroup.description}
          onChange={handleFieldGroupChange}
          fullWidth
          margin="normal"
        />
        <Button variant="outlined" color="primary" onClick={addFieldGroup} fullWidth>
          Add New Section
        </Button>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '10px'
        }}
      >
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Save Form Template
        </Button>
        <Button variant="outlined" onClick={() => setOpenPreviewModal(true)} fullWidth>
          Preview Form Template
        </Button>
      </Box>
      <FormPreviewModal form={form} openModal={openPreviewModal} handleCloseModal={handleClosePreviewModal} />=
    </Container>
  );
};

export default FormBuilder;
