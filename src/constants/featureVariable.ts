const FEATURE_LIST = [
  { variableName: '', dataType: '', choices: '' },
  { variableName: 'patient_id', dataType: 'string', choices: '' },
  { variableName: 'age_at_nephrectomy', dataType: 'number', choices: '' },
  { variableName: 'gender', dataType: 'string', choices: 'male,female' },
  { variableName: 'body_mass_index', dataType: 'number', choices: '' },
  {
    variableName: 'comorbidities__myocardial_infarction',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__congestive_heart_failure',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__peripheral_vascular_disease',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__cerebrovascular_disease',
    dataType: 'boolean',
    choices: '',
  },
  { variableName: 'comorbidities__dementia', dataType: 'boolean', choices: '' },
  { variableName: 'comorbidities__copd', dataType: 'boolean', choices: '' },
  {
    variableName: 'comorbidities__connective_tissue_disease',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__peptic_ulcer_disease',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__uncomplicated_diabetes_mellitus',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__diabetes_mellitus_with_end_organ_damage',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__chronic_kidney_disease',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__hemiplegia_from_stroke',
    dataType: 'boolean',
    choices: '',
  },
  { variableName: 'comorbidities__leukemia', dataType: 'boolean', choices: '' },
  {
    variableName: 'comorbidities__malignant_lymphoma',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__localized_solid_tumor',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__metastatic_solid_tumor',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__mild_liver_disease',
    dataType: 'boolean',
    choices: '',
  },
  {
    variableName: 'comorbidities__moderate_to_severe_liver_disease',
    dataType: 'boolean',
    choices: '',
  },
  { variableName: 'comorbidities__aids', dataType: 'boolean', choices: '' },
  {
    variableName: 'smoking_history',
    dataType: 'string',
    choices: 'never_smoked,current_smoker,previous_smoker',
  },
  { variableName: 'age_when_quit_smoking', dataType: 'number', choices: '' },
  { variableName: 'pack_years', dataType: 'number', choices: '' },
];

export default FEATURE_LIST;
