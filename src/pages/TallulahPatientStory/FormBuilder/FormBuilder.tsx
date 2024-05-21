import { useState } from 'react';
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
  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    fieldGroups: []
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
    const updatedFieldGroups = [...form.fieldGroups];
    const updatedFields = [...updatedFieldGroups[groupIndex].fields];
    const updatedField = {
      ...updatedFields[fieldIndex],
      [name]: type === 'checkbox' ? checked : value
    };
    updatedFields[fieldIndex] = updatedField;
    updatedFieldGroups[groupIndex].fields = updatedFields;
    setForm({ ...form, fieldGroups: updatedFieldGroups });
  };

  const addFieldGroup = () => {
    setForm({
      ...form,
      fieldGroups: [...form.fieldGroups, { ...newFieldGroup, fields: [{ ...newField }] }]
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
    const updatedFieldGroups = [...form.fieldGroups];
    updatedFieldGroups[groupIndex].fields = [...updatedFieldGroups[groupIndex].fields, { ...newField }];
    setForm({ ...form, fieldGroups: updatedFieldGroups });
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
    const updatedFieldGroups = [...form.fieldGroups];
    updatedFieldGroups.splice(groupIndex, 1);
    setForm({ ...form, fieldGroups: updatedFieldGroups });
  };

  const removeField = (groupIndex: any, fieldIndex: any) => {
    const updatedFieldGroups = [...form.fieldGroups];
    updatedFieldGroups[groupIndex].fields.splice(fieldIndex, 1);
    setForm({ ...form, fieldGroups: updatedFieldGroups });
  };

  const handleSubmit = () => {
    console.log('Form Template:', JSON.stringify(form, null, 2));
  };

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

      {form.fieldGroups.map((group: any, groupIndex: any) => (
        <Paper key={groupIndex} style={{ padding: 16, marginBottom: 16 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Field Group {groupIndex + 1}: {group.name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="secondary" onClick={() => removeFieldGroup(groupIndex)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            label="Group Name"
            name="name"
            value={group.name}
            onChange={(e) => {
              const updatedFieldGroups = [...form.fieldGroups];
              updatedFieldGroups[groupIndex].name = e.target.value;
              setForm({ ...form, fieldGroups: updatedFieldGroups });
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Group Description"
            name="description"
            value={group.description}
            onChange={(e) => {
              const updatedFieldGroups = [...form.fieldGroups];
              updatedFieldGroups[groupIndex].description = e.target.value;
              setForm({ ...form, fieldGroups: updatedFieldGroups });
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
        <Button variant="contained" color="primary" onClick={addFieldGroup} fullWidth>
          Add Field Group
        </Button>
      </Paper>

      <Button variant="contained" color="secondary" onClick={handleSubmit} fullWidth>
        Save Form Template
      </Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
        Form Preview
      </Typography>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </Container>
  );
};

export default FormBuilder;
