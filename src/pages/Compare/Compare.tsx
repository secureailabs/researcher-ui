import React, { useState, type HTMLAttributes } from 'react';
import { Grid, Paper, Typography, Box, Autocomplete, TextField, Checkbox, Button } from '@mui/material';
import Plot from 'react-plotly.js';
import styles from './Compare.module.css';
import { styled } from '@mui/material/styles';
import { cp } from 'fs';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import PieChartSection from './components/PieChartSection';
import BarGraph1 from './components/BarGraph1';
import { connect } from 'react-redux';

interface ICompareProps {
  scnDetails: any;
}

const Compare: React.FC<ICompareProps> = ({ scnDetails }) => {
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  const [hospitalList, setHospitalList] = useState<any[]>([]);
  const [attributeList, setAttributeList] = useState<any[]>([]);

  // (async () => {
  //   let response = await fetch('http://127.0.0.1:8000/compare/', {
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       chosen_hospitals: ['string'],
  //       attributes_to_be_compared: ['string']
  //     })
  //   });
  //   const data = await response.json();
  //   setPieData(data.pie_charts);
  //   setBarData(data.histograms);
  // })()
  const HOSPITAL_CHOICES = [
    'Desert Springs Medical Center',
    'Saint Jacob Clinic',
    'Mercy General Hospital',
    'Grand Mountain Clinic',
    'Provenance Medical',
    'Great River Wellness Hospital'
  ];
  const ATTRIBUTES = [
    'Sex',
    'Rurality',
    'Race',
    'Age at diagnosis in years',
    'Age at death in years',
    'Survival time in years',
    'Socioeconomic',
    'Ethnicity'
  ];

  const StyledOption = styled('div')<StyledOptionProps>(({ option }) => ({
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  }));

  const renderOption = (props: any, option: any): JSX.Element => (
    <li {...props} key={option.series_name}>
      <StyledOption option={option}>{option.series_name}</StyledOption>
    </li>
  );

  interface StyledOptionProps extends HTMLAttributes<HTMLDivElement> {
    option: string;
  }

  const renderOptionWithCheckbox = (props: any, option: any, { selected }: any): JSX.Element => (
    <li {...props} key={option}>
      <StyledOption option={option}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option}
      </StyledOption>
    </li>
  );

  const compareAndFetch = async () => {
    const body = {
      chosen_hospitals: hospitalList,
      attributes_to_be_compared: attributeList
    };
    try {
      const response = await axios.post(`${scnDetails.baseUrl}/pag/compare`, body);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompare = () => {
    compareAndFetch().then((data) => {
      if (data) {
        const tempPieDataArray = [];
        setPieData(data.data.pie_charts);
        setBarData(data.data.histograms);
      }
    });
  };

  return (
    <Box className={styles.container}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center'
        }}
      >
        Comparative Analysis
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '40px',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff'
        }}
      >
        <Autocomplete
          multiple
          className={styles.autocomplete}
          disablePortal
          id="feature-dropdown-checkboxes"
          value={hospitalList}
          options={HOSPITAL_CHOICES}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Choose hospitals" />}
          renderOption={renderOptionWithCheckbox}
          onChange={(event, newValue) => {
            setHospitalList(newValue);
          }}
          style={{ width: 500 }}
        />
        <Autocomplete
          multiple
          className={styles.autocomplete}
          disablePortal
          id="feature-dropdown-checkboxes"
          value={attributeList}
          options={ATTRIBUTES}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Choose attributes" />}
          renderOption={renderOptionWithCheckbox}
          onChange={(event, newValue) => {
            setAttributeList(newValue);
          }}
          style={{ width: 500 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '40px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button variant="contained" onClick={handleCompare}>
          Compare
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: '80px'
        }}
      >
        <Grid container spacing={1} className={styles.piechartsection}>
          {pieData.map((chart, index) => (
            <Grid item xs={3} md={5}>
              <PieChartSection key={index} index={index} chart={chart} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid container spacing={1} className={styles.piechartsection}>
          {barData.map((chart, index) => (
            <BarGraph1 index={index} BarGraph1Data={chart} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  scnDetails: state.scn_details
});

export default connect(mapStateToProps)(Compare);
