export const columnData = [
  { label: 'Patients', value: 42 },
  { label: 'Hospitals', value: 7 },
  { label: 'Researchers', value: 15 },
  { label: 'Queries', value: 230 },
  { label: 'Compute', value: 96 }
];

export const pieChartData = [
  {
    label: 'Sex',
    data: [
      { label: 'Assigned female at birth', value: 45 },
      { label: 'Assigned male at birth', value: 50 },
      { label: 'Assigned intersex at birth', value: 5 }
    ]
  },
  {
    label: 'Rurality',
    data: [
      { label: 'Metropolitan', value: 30 },
      { label: 'Micropolitan', value: 20 },
      { label: 'Small town', value: 25 },
      { label: 'Rural', value: 25 }
    ]
  },
  {
    label: 'Race',
    data: [
      { label: 'White', value: 40 },
      { label: 'Black or African American', value: 30 },
      { label: 'Asian', value: 20 },
      { label: 'Hispanic or Latino', value: 5 },
      { label: 'American Indian or Alaska Native', value: 3 },
      { label: 'Native Hawaiian or Other Pacific Island', value: 2 }
    ]
  },
  {
    label: 'Socioeconomic',
    data: [
      { label: 'Middle class', value: 20 },
      { label: 'Lower middle class', value: 15 },
      { label: 'Upper middle class', value: 25 },
      { label: 'Lower class', value: 30 },
      { label: 'Upper class', value: 10 }
    ]
  },
  {
    label: 'Ethnicity',
    data: [
      { label: 'Not Hispanic or Latino', value: 60 },
      { label: 'Hispanic or Latino', value: 40 }
    ]
  }
];

export const ageData = {
  label: 'Age at diagnosis in years',
  data: [
    { range: '20-30', value: 10 },
    { range: '30-40', value: 20 },
    { range: '40-50', value: 30 },
    { range: '50-60', value: 40 },
    { range: '60-70', value: 50 },
    { range: '70+', value: 60 }
  ]
};

export const deathData = {
  label: 'Age at death in years',
  data: [
    { range: '20-30', value: 5 },
    { range: '30-40', value: 15 },
    { range: '40-50', value: 25 },
    { range: '50-60', value: 35 },
    { range: '60-70', value: 45 },
    { range: '70+', value: 55 }
  ]
};

export const survivalData = {
  label: 'Survival time in years',
  data: [
    { range: '0-1', value: 50 },
    { range: '1-2', value: 60 },
    { range: '2-3', value: 70 },
    { range: '3-4', value: 80 },
    { range: '4-5', value: 90 },
    { range: '5+', value: 100 }
  ]
};
