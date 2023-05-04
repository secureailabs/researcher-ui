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
    series_name: 'age_at_nephrectomy'
  },
  gender: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'gender',
    list_value: ['male', 'female']
  },
  body_mass_index: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'body_mass_index'
  },
  comorbidities__myocardial_infarction: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__myocardial_infarction',
    list_value: ['False', 'True']
  },
  comorbidities__congestive_heart_failure: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__congestive_heart_failure',
    list_value: ['False', 'True']
  },
  comorbidities__peripheral_vascular_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peripheral_vascular_disease',
    list_value: ['False', 'True']
  },
  comorbidities__cerebrovascular_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__cerebrovascular_disease',
    list_value: ['False', 'True']
  },
  comorbidities__dementia: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__dementia',
    list_value: ['False']
  },
  comorbidities__copd: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__copd',
    list_value: ['False', 'True']
  },
  comorbidities__connective_tissue_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__connective_tissue_disease',
    list_value: ['False', 'True']
  },
  comorbidities__peptic_ulcer_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__peptic_ulcer_disease',
    list_value: ['False', 'True']
  },
  comorbidities__uncomplicated_diabetes_mellitus: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__uncomplicated_diabetes_mellitus',
    list_value: ['False', 'True']
  },
  comorbidities__diabetes_mellitus_with_end_organ_damage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__diabetes_mellitus_with_end_organ_damage',
    list_value: ['False', 'True']
  },
  comorbidities__chronic_kidney_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__chronic_kidney_disease',
    list_value: ['False', 'True']
  },
  comorbidities__hemiplegia_from_stroke: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__hemiplegia_from_stroke',
    list_value: ['False', 'True']
  },
  comorbidities__leukemia: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__leukemia',
    list_value: ['False', 'True']
  },
  comorbidities__malignant_lymphoma: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__malignant_lymphoma',
    list_value: ['False', 'True']
  },
  comorbidities__localized_solid_tumor: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__localized_solid_tumor',
    list_value: ['False', 'True']
  },
  comorbidities__metastatic_solid_tumor: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__metastatic_solid_tumor',
    list_value: ['False', 'True']
  },
  comorbidities__mild_liver_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__mild_liver_disease',
    list_value: ['False', 'True']
  },
  comorbidities__moderate_to_severe_liver_disease: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__moderate_to_severe_liver_disease',
    list_value: ['False', 'True']
  },
  comorbidities__aids: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'comorbidities__aids',
    list_value: ['False']
  },
  smoking_history: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'smoking_history',
    list_value: ['never_smoked', 'previous_smoker', 'current_smoker']
  },
  age_when_quit_smoking: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'age_when_quit_smoking'
  },
  pack_years: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'pack_years'
  },
  chewing_tobacco_use: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'chewing_tobacco_use',
    list_value: ['never_or_not_in_last_3mo', 'quit_in_last_3mo']
  },
  alcohol_use: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'alcohol_use',
    list_value: ['two_or_less_daily', 'never_or_not_in_last_3mo', 'more_than_two_daily']
  },
  intraoperative_complications__blood_transfusion: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__blood_transfusion',
    list_value: ['False', 'True']
  },
  intraoperative_complications__injury_to_surrounding_organ: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__injury_to_surrounding_organ',
    list_value: ['False', 'True']
  },
  intraoperative_complications__cardiac_event: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'intraoperative_complications__cardiac_event',
    list_value: ['False']
  },
  hospitalization: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'hospitalization'
  },
  ischemia_time: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'ischemia_time'
  },
  radiographic_size: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'radiographic_size'
  },
  pathologic_size: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'pathologic_size'
  },
  malignant: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'malignant',
    list_value: ['True', 'False']
  },
  pathology_t_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_t_stage',
    list_value: ['1a', '3', '1b', '0', '2b', '2a', '4']
  },
  pathology_n_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_n_stage',
    list_value: ['0', 'X', '1']
  },
  pathology_m_stage: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'pathology_m_stage',
    list_value: ['0', 'X', '1']
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
      'multilocular_cystic_rcc'
    ]
  },
  tumor_necrosis: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'tumor_necrosis',
    list_value: ['False', 'True']
  },
  tumor_isup_grade: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'tumor_isup_grade'
  },
  clavien_surgical_complications: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'clavien_surgical_complications',
    list_value: ['0', '1', '2', '5', '3b', '3a', '4']
  },
  er_visit: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'er_visit',
    list_value: ['False', 'True']
  },
  readmission: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'readmission',
    list_value: ['False', 'True']
  },
  estimated_blood_loss: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'estimated_blood_loss'
  },
  surgery_type: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgery_type',
    list_value: ['robotic', 'open', 'laparoscopic']
  },
  surgical_procedure: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgical_procedure',
    list_value: ['partial_nephrectomy', 'radical_nephrectomy']
  },
  surgical_approach: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'surgical_approach',
    list_value: ['Transperitoneal', 'Retroperitoneal']
  },
  operative_time: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'operative_time'
  },
  cytoreductive: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'cytoreductive',
    list_value: ['False', 'True']
  },
  positive_resection_margins: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'positive_resection_margins',
    list_value: ['False', 'True']
  },
  last_preop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_preop_egfr'
  },
  last_preop_egfr_days_before_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_preop_egfr_days_before_surgery'
  },
  first_postop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'first_postop_egfr'
  },
  first_postop_egfr_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'first_postop_egfr_days_after_surgery'
  },
  last_postop_egfr: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_postop_egfr'
  },
  last_postop_egfr_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'last_postop_egfr_days_after_surgery'
  },
  vital_status: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'vital_status',
    list_value: ['censored', 'dead']
  },
  vital_days_after_surgery: {
    __type__: 'SeriesDataModelInterval',
    series_name: 'vital_days_after_surgery'
  },
  tumor_histologic_subtype_broad: {
    __type__: 'SeriesDataModelCategorical',
    series_name: 'tumor_histologic_subtype_broad',
    list_value: ['clear_cell', 'papillary', 'non_clear_cell', 'oncocytoma']
  }
};

// FEATURE LIST IS ARRAY OF THE ABOVE DATA_MDOEL WITH THE KEYS AS THE FEATURE NAMES
const FEATURE_LIST = Object.keys(DATA_MODEL).map((key) => {
  return {
    ...DATA_MODEL[key]
  };
});

// Longitudinal Data Model
const LONGITUDINAL_DATA_MODEL = {
  __type__: 'TabularDatasetDataModel',
  tabular_dataset_data_model_id: 'a177b978-8d47-4b87-b14f-f880f3b18753',
  list_data_frame_data_model: [
    {
      __type__: 'DataFrameDataModel',
      data_frame_name: 'static_data_table',
      data_frame_data_model_id: 'a62a58bc-4bef-489c-ad11-42ff1c79e868',
      list_series_data_model: [
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'patient_id',
          series_data_model_id: 'eaca7e2e-9aaf-462b-ae0b-b0f54454d44b'
        },
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'dataset_id',
          series_data_model_id: '35359019-aa4d-4c77-9d86-3e51ac4f1295'
        },
        {
          __type__: 'SeriesDataModelDate',
          series_name: 'date_of_birth',
          series_data_model_id: '5c115d90-4906-4d98-b1d9-8a3095947ab4'
        },
        {
          __type__: 'SeriesDataModelDate',
          series_name: 'pancreatic_cancer_date_of_diagnosis',
          series_data_model_id: 'af7e61cd-ef5f-48fd-99cb-e88e48646b1b'
        },
        {
          __type__: 'SeriesDataModelCategorical',
          series_name: 'pancreatic_cancer_metastatic_at_diagnosis',
          series_data_model_id: '1d7daed7-9fc9-4bd6-9553-0b76ffdd0ed9',
          list_value: ['local', 'metastatic']
        },
        {
          __type__: 'SeriesDataModelCategorical',
          series_name: 'pancreatic_cancer_method_of_diagnosis',
          series_data_model_id: '809823e1-d3d8-4312-b20d-e948f236e746',
          list_value: ['posible', 'probable', 'definite']
        },
        {
          __type__: 'SeriesDataModelDate',
          series_name: 'preexisting_diabetes_date_of_diagnosis',
          series_data_model_id: '9db4da21-4299-4fc3-8406-4846e852dbd1'
        },
        {
          __type__: 'SeriesDataModelDate',
          series_name: 'new_onset_diabetes_date_of_diagnosis',
          series_data_model_id: 'db064f90-fdae-44d2-828a-8357c4e1e7f6'
        },
        {
          __type__: 'SeriesDataModelCategorical',
          series_name: 'race',
          series_data_model_id: 'e3215bdb-218d-4855-b913-1d461240da65',
          list_value: [
            'American Indian or Alaska Native',
            'Asian',
            'Black or African American',
            'Hispanic or Latino',
            'Native Hawaiian or Other Pacific Islander',
            'White'
          ]
        },
        {
          __type__: 'SeriesDataModelCategorical',
          series_name: 'ethnicity',
          series_data_model_id: '1e3c38c8-e55c-40e6-aa45-5495bfaa6622',
          list_value: ['Hispanic or Latino', 'Not Hispanic or Latino']
        },
        {
          __type__: 'SeriesDataModelInterval',
          series_name: 'height',
          series_data_model_id: '3399e37e-1e6f-4625-a855-0e457c254be2',
          unit: 'cm',
          min: null,
          max: null,
          resolution: null
        }
      ]
    },
    {
      __type__: 'DataFrameDataModel',
      data_frame_name: 'longitudinal_weight_table',
      data_frame_data_model_id: '1f7ccf40-543d-4572-9d6b-473c8c24df60',
      list_series_data_model: [
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'patient_id',
          series_data_model_id: 'e7c6d223-4555-4464-a11e-402dd1f28e48'
        },
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'dataset_id',
          series_data_model_id: 'd5d76b66-0349-49e4-b8cd-164c02fa00cc'
        },
        {
          __type__: 'SeriesDataModelDateTime',
          series_name: 'datetime_of_measurement',
          series_data_model_id: '001fc71a-6a0c-4bec-ba7c-416cebdfe4a1'
        },
        {
          __type__: 'SeriesDataModelInterval',
          series_name: 'weight',
          series_data_model_id: '24b9476a-9338-4ea7-9223-cd08c177fafe',
          unit: 'kg',
          min: null,
          max: null,
          resolution: null
        }
      ]
    },
    {
      __type__: 'DataFrameDataModel',
      data_frame_name: 'longitudinal_hba1c_table',
      data_frame_data_model_id: 'c5453a9b-3bd3-4847-b611-133637214553',
      list_series_data_model: [
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'patient_id',
          series_data_model_id: 'f1f5a386-5491-43b0-a61a-842512aba840'
        },
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'dataset_id',
          series_data_model_id: 'cbe099c6-6147-4e3b-8c27-a1cd6ec11856'
        },
        {
          __type__: 'SeriesDataModelDateTime',
          series_name: 'datetime_of_measurement',
          series_data_model_id: '80ea7bca-07d5-417c-bd0a-c3018bcc9ab5'
        },
        {
          __type__: 'SeriesDataModelInterval',
          series_name: 'HbA1C',
          series_data_model_id: '3740181d-f8c8-441d-976c-7e09fcce9ad4',
          unit: '%',
          min: null,
          max: null,
          resolution: null
        }
      ]
    },
    {
      __type__: 'DataFrameDataModel',
      data_frame_name: 'longitudinal_fbg_table',
      data_frame_data_model_id: '113529b4-af73-4824-b483-da7edbf5e90b',
      list_series_data_model: [
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'patient_id',
          series_data_model_id: 'e5f86de4-1bc5-4c46-9979-0e81c6bb2d43'
        },
        {
          __type__: 'SeriesDataModelUnique',
          series_name: 'dataset_id',
          series_data_model_id: '6e4529d5-59ee-45d1-bd99-50f7a947cf77'
        },
        {
          __type__: 'SeriesDataModelDateTime',
          series_name: 'datetime_of_measurement',
          series_data_model_id: 'df6a7c85-b67e-46ee-9eed-83cc69fbd9e8'
        },
        {
          __type__: 'SeriesDataModelInterval',
          series_name: 'FBG',
          series_data_model_id: '2e10a0a5-62ee-493c-bc52-56812b0c547b',
          unit: 'mg/dl',
          min: null,
          max: null,
          resolution: null
        }
      ]
    }
  ]
};

const LONGITUDINAL_VARIABLES = {
  static: LONGITUDINAL_DATA_MODEL.list_data_frame_data_model[0].list_series_data_model,
  longitudinal: [
    {
      __type__: 'SeriesDataModelInterval',
      series_name: 'weight',
      series_data_model_id: '24b9476a-9338-4ea7-9223-cd08c177fafe',
      unit: 'kg',
      min: null,
      max: null,
      resolution: null
    },
    {
      __type__: 'SeriesDataModelInterval',
      series_name: 'HbA1C',
      series_data_model_id: '3740181d-f8c8-441d-976c-7e09fcce9ad4',
      unit: '%',
      min: null,
      max: null,
      resolution: null
    },

    {
      __type__: 'SeriesDataModelInterval',
      series_name: 'FBG',
      series_data_model_id: '2e10a0a5-62ee-493c-bc52-56812b0c547b',
      unit: 'mg/dl',
      min: null,
      max: null,
      resolution: null
    }
  ]
};

export default FEATURE_LIST;

export { LONGITUDINAL_DATA_MODEL, LONGITUDINAL_VARIABLES };
