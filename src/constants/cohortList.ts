const COHORT_LIST_DATA = [
  {
    cohortId: 'hypertension',
    cohortName: 'Hypertension',
    cohortDescription: 'No comorbidities',
    filters: [
      {
        id: 1,
        series_name: 'patient_id',
        operator: 'gt',
        value: 25,
      },
      {
        id: 2,
        series_name: 'body_mass_index',
        operator: 'gt',
        value: 20,
      },
      {
        id: 3,
        series_name: 'gender',
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
        series_name: 'age_at_nephrectomy',
        operator: 'gt',
        value: 25,
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
        series_name: 'gender',
        operator: 'eq',
        value: 'female',
      },
      {
        id: 6,
        series_name: 'body_mass_index',
        operator: 'gt',
        value: 20,
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
        series_name: 'hospitalization',
        operator: 'gt',
        value: '20',
      },
      {
        id: 8,
        series_name: 'ischemia_time',
        operator: 'eq',
        value: '10',
      },
      {
        id: 9,
        series_name: 'gender',
        operator: 'eq',
        value: 'female',
      },
    ],
    filterOperator: ['and', 'or'],
  },
];

export default COHORT_LIST_DATA;
