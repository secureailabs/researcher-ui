const COHORT_LIST = [
  {
    cohortName: 'hypertension',
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
    cohortName: 'Age group > 25',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 1,
        variable: 'patient_id',
        operator: 'gt',
        value: '25',
      },
    ],
    filterOperator: [],
  },
  {
    cohortName: 'Demo cohort 1',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 1,
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
      {
        id: 2,
        variable: 'body_mass_index',
        operator: 'gt',
        value: '20',
      },
    ],
    filterOperator: ['and'],
  },
  {
    cohortName: 'Demo cohort 2',
    cohortDescription: 'Hypertension',
    filters: [
      {
        id: 1,
        variable: 'comorbidities__metastatic_solid_tumor',
        operator: 'gt',
        value: '20',
      },
      {
        id: 2,
        variable: 'smoking_history',
        operator: 'eq',
        value: 'never',
      },
      {
        id: 3,
        variable: 'gender',
        operator: 'eq',
        value: 'female',
      },
    ],
    filterOperator: ['and', 'or'],
  },
];

export default COHORT_LIST;
