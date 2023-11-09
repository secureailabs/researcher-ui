import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import SAMPLE_DATA from '../../TallulahSearch/sample_search';


const AgeChart: React.FC = () => {
  const data = SAMPLE_DATA.map((patient: any) => patient._source.Age);

  const ageArray = [];
  ageArray.push({ id: 0, value: data.filter((age: any) => age >= 0 && age <= 5).length, label: '0-5 years' });
  ageArray.push({ id: 1, value: data.filter((age: any) => age > 5 && age <= 10).length, label: '5-10 years' });
  ageArray.push({ id: 2, value: data.filter((age: any) => age > 10 && age <= 18).length, label: '10-18 years' });
  ageArray.push({ id: 3, value: data.filter((age: any) => age > 18 && age <= 35).length, label: '18-35 years' });
  ageArray.push({ id: 4, value: data.filter((age: any) => age > 35 && age <= 50).length, label: '35-50 years' });
  ageArray.push({ id: 5, value: data.filter((age: any) => age > 50 && age <= 70).length, label: '50-70 years' });
  ageArray.push({ id: 6, value: data.filter((age: any) => age > 70 && age <= 85).length, label: '70-85 years' });
  ageArray.push({ id: 7, value: data.filter((age: any) => age > 85).length, label: '85+ years' });


  const size = {
    height: 120,
  };

  return (
    <React.Fragment>
      <PieChart
        series={[
          {
            data: ageArray,
            innerRadius: 30,
            outerRadius: 50,
            cx: 120,
            cy: 60,
           
          },
        ]} {...size}
        legend={{ hidden: true }}
      />
    </React.Fragment>
  );
};

export default AgeChart;