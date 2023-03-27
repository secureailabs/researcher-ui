const COHORT_LIST = [
  {
    cohortId: 'hypertension',
    cohortName: 'hypertension',
    cohortDescription: 'No comorbidities',
    filters: [
      {
        id: 'hypertension-1',
        variable: 'patient_id',
        operator: 'gt',
        value: '25',
      },
      {
        id: 'hypertension-2',
        variable: 'body_mass_index',
        operator: 'gt',
        value: '20',
      },
      {
        id: 'hypertension-3',
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
    ],
    filterOperator: ['and', 'and'],
  },
  {
    cohortId: 'age_group_25',
    cohortName: 'Age group > 25',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 'age_group_25-1',
        variable: 'age_at_nephrectomy',
        operator: 'gt',
        value: '25',
      },
    ],
    filterOperator: [],
  },
  {
    cohortId: 'demo_cohort_1',
    cohortName: 'Demo cohort 1',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 'demo_cohort_1-1',
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
      {
        id: 'demo_cohort_1-2',
        variable: 'body_mass_index',
        operator: 'gt',
        value: '20',
      },
    ],
    filterOperator: ['and'],
  },
  {
    cohortId: 'demo_cohort_2',
    cohortName: 'Demo cohort 2',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 'demo_cohort_2-1',
        variable: 'comorbidities__metastatic_solid_tumor',
        operator: 'gt',
        value: '20',
      },
      {
        id: 'demo_cohort_2-2',
        variable: 'smoking_history',
        operator: 'eq',
        value: 'never',
      },
      {
        id: 'demo_cohort_2-3',
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
    ],
    filterOperator: ['and', 'or'],
  },
];

export default COHORT_LIST;
