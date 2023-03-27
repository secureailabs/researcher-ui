const COHORT_LIST = [
  {
    cohortId: 'hypertension',
    cohortName: 'Hypertension',
    cohortDescription: 'No comorbidities',
    filters: [
      {
        id: 1,
        variable: 'patient_id',
        operator: 'gt',
        value: '25',
      },
      {
        id: 2,
        variable: 'body_mass_index',
        operator: 'gt',
        value: '20',
      },
      {
        id: 3,
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
        id: 4,
        variable: 'age_at_nephrectomy',
        operator: 'gt',
        value: '25',
      },
    ],
    filterOperator: [],
  },
  {
    cohortId: 'demo_cohort_1',
    cohortName: 'Sample cohort 1',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 5,
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
      {
        id: 6,
        variable: 'body_mass_index',
        operator: 'gt',
        value: '20',
      },
    ],
    filterOperator: ['and'],
  },
  {
    cohortId: 'demo_cohort_2',
    cohortName: 'Sample cohort 2',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 7,
        variable: 'comorbidities__metastatic_solid_tumor',
        operator: 'gt',
        value: '20',
      },
      {
        id: 8,
        variable: 'smoking_history',
        operator: 'eq',
        value: 'never',
      },
      {
        id: 9,
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
    ],
    filterOperator: ['and', 'or'],
  },
];

export default COHORT_LIST;
