const FEATURE_LIST = [
  {
    __type__: 'SeriesDataModelUnique',
    series_name: 'patient_id',
  },
  {
    __type__: 'SeriesDataModelInterval',
    series_name: 'age_at_nephrectomy',
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'gender',
    list_value: ['male', 'female'],
  },
  {
    __type__: 'SeriesDataModelInterval',
    series_name: 'body_mass_index',
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__myocardial_infarction',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__congestive_heart_failure',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peripheral_vascular_disease',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__cerebrovascular_disease',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__dementia',
    list_value: ['False'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__copd',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__connective_tissue_disease',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peptic_ulcer_disease',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__uncomplicated_diabetes_mellitus',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__diabetes_mellitus_with_end_organ_damage',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__chronic_kidney_disease',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__hemiplegia_from_stroke',
    list_value: ['False', 'True'],
  },
  {
    __type__: 'SeriesDataModelInterval',
    series_name: 'hospitalization',
  },
  {
    __type__: 'SeriesDataModelInterval',
    series_name: 'ischemia_time',
  },
  {
    __type__: 'SeriesDataModelInterval',
    series_name: 'radiographic_size',
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_t_stage',
    list_value: ['1a', '3', '1b', '0', '2b', '2a', '4'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_m_stage',
    list_value: ['0', 'X', '1'],
  },
  {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'tumor_histologic_subtype',
    list_value: [
      'clear_cell_rcc',
      'papillary',
      'chromophobe',
      'angiomyolipoma',
      'rcc_unclassified',
      'oncocytoma',
      'spindle_cell_neoplasm',
      'mest',
      'clear_cell_papillary_rcc',
      'wilms',
      'urothelial',
      'multilocular_cystic_rcc',
    ],
  },
];

export default FEATURE_LIST;
