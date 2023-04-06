type IDATA_MODEL = Record<
  string,
  {
    __type__: string;
    series_name: string;
    list_value?: string[];
    // ...
  }
>;

const DATA_MODEL: IDATA_MODEL = {
  patient_id: { __type__: 'SeriesDataModelUnique', series_name: 'patient_id' },
  age_at_nephrectomy: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'age_at_nephrectomy',
  },
  gender: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'gender',
    list_value: ['male', 'female'],
  },
  body_mass_index: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'body_mass_index',
  },
  comorbidities__myocardial_infarction: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__myocardial_infarction',
    list_value: ['False', 'True'],
  },
  comorbidities__congestive_heart_failure: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__congestive_heart_failure',
    list_value: ['False', 'True'],
  },
  comorbidities__peripheral_vascular_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peripheral_vascular_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__cerebrovascular_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__cerebrovascular_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__dementia: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__dementia',
    list_value: ['False'],
  },
  comorbidities__copd: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__copd',
    list_value: ['False', 'True'],
  },
  comorbidities__connective_tissue_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__connective_tissue_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__peptic_ulcer_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peptic_ulcer_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__uncomplicated_diabetes_mellitus: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__uncomplicated_diabetes_mellitus',
    list_value: ['False', 'True'],
  },
  comorbidities__diabetes_mellitus_with_end_organ_damage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__diabetes_mellitus_with_end_organ_damage',
    list_value: ['False', 'True'],
  },
  comorbidities__chronic_kidney_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__chronic_kidney_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__hemiplegia_from_stroke: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__hemiplegia_from_stroke',
    list_value: ['False', 'True'],
  },
  comorbidities__leukemia: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__leukemia',
    list_value: ['False', 'True'],
  },
  comorbidities__malignant_lymphoma: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__malignant_lymphoma',
    list_value: ['False', 'True'],
  },
  comorbidities__localized_solid_tumor: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__localized_solid_tumor',
    list_value: ['False', 'True'],
  },
  comorbidities__metastatic_solid_tumor: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__metastatic_solid_tumor',
    list_value: ['False', 'True'],
  },
  comorbidities__mild_liver_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__mild_liver_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__moderate_to_severe_liver_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__moderate_to_severe_liver_disease',
    list_value: ['False', 'True'],
  },
  comorbidities__aids: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__aids',
    list_value: ['False'],
  },
  smoking_history: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'smoking_history',
    list_value: ['never_smoked', 'previous_smoker', 'current_smoker'],
  },
  age_when_quit_smoking: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'age_when_quit_smoking',
  },
  pack_years: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'pack_years',
  },
  chewing_tobacco_use: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'chewing_tobacco_use',
    list_value: ['never_or_not_in_last_3mo', 'quit_in_last_3mo'],
  },
  alcohol_use: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'alcohol_use',
    list_value: [
      'two_or_less_daily',
      'never_or_not_in_last_3mo',
      'more_than_two_daily',
    ],
  },
  intraoperative_complications__blood_transfusion: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__blood_transfusion',
    list_value: ['False', 'True'],
  },
  intraoperative_complications__injury_to_surrounding_organ: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__injury_to_surrounding_organ',
    list_value: ['False', 'True'],
  },
  intraoperative_complications__cardiac_event: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__cardiac_event',
    list_value: ['False'],
  },
  hospitalization: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'hospitalization',
  },
  ischemia_time: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'ischemia_time',
  },
  radiographic_size: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'radiographic_size',
  },
  pathologic_size: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'pathologic_size',
  },
  malignant: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'malignant',
    list_value: ['True', 'False'],
  },
  pathology_t_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_t_stage',
    list_value: ['1a', '3', '1b', '0', '2b', '2a', '4'],
  },
  pathology_n_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_n_stage',
    list_value: ['0', 'X', '1'],
  },
  pathology_m_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_m_stage',
    list_value: ['0', 'X', '1'],
  },
  tumor_histologic_subtype: {
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
  tumor_necrosis: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'tumor_necrosis',
    list_value: ['False', 'True'],
  },
  tumor_isup_grade: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'tumor_isup_grade',
  },
  clavien_surgical_complications: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'clavien_surgical_complications',
    list_value: ['0', '1', '2', '5', '3b', '3a', '4'],
  },
  er_visit: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'er_visit',
    list_value: ['False', 'True'],
  },
  readmission: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'readmission',
    list_value: ['False', 'True'],
  },
  estimated_blood_loss: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'estimated_blood_loss',
  },
  surgery_type: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgery_type',
    list_value: ['robotic', 'open', 'laparoscopic'],
  },
  surgical_procedure: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgical_procedure',
    list_value: ['partial_nephrectomy', 'radical_nephrectomy'],
  },
  surgical_approach: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgical_approach',
    list_value: ['Transperitoneal', 'Retroperitoneal'],
  },
  operative_time: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'operative_time',
  },
  cytoreductive: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'cytoreductive',
    list_value: ['False', 'True'],
  },
  positive_resection_margins: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'positive_resection_margins',
    list_value: ['False', 'True'],
  },
  last_preop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_preop_egfr',
  },
  last_preop_egfr_days_before_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_preop_egfr_days_before_surgery',
  },
  first_postop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'first_postop_egfr',
  },
  first_postop_egfr_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'first_postop_egfr_days_after_surgery',
  },
  last_postop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_postop_egfr',
  },
  last_postop_egfr_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_postop_egfr_days_after_surgery',
  },
  vital_status: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'vital_status',
    list_value: ['censored', 'dead'],
  },
  vital_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'vital_days_after_surgery',
  },
  tumor_histologic_subtype_broad: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'tumor_histologic_subtype_broad',
    list_value: ['clear_cell', 'papillary', 'non_clear_cell', 'oncocytoma'],
  },
};

// FEATURE LIST IS ARRAY OF THE ABOVE DATA_MDOEL WITH THE KEYS AS THE FEATURE NAMES
const FEATURE_LIST = Object.keys(DATA_MODEL).map((key) => {
  return {
    ...DATA_MODEL[key],
  };
});

export default FEATURE_LIST;
