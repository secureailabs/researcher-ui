import { Box, CircularProgress } from '@mui/material';
import { Form, Radio, Table, TableColumnsType } from 'antd';
import FEATURE_LIST from 'src/constants/featureVariable';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GetDataModel_Out, DefaultService, GetMultipleDataModelDataframe_Out, ApiError } from 'src/client';

interface DataType {
  key: React.Key;
  name: string;
  description: string;
  publishDate: string | undefined;
}

interface ExpandedDataType {
  key: React.Key;
  feature: string;
}

const AntTable: React.FC = () => {
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();

  const fetchAllDataFrames = async () => {
    const res1 = await DefaultService.getAllDataModelInfo();
    // Only taling the first from the array list
    setDataModelInfo(res1.data_models[0]);
    const dataModelId = res1.data_models[0].id;
    const res = await DefaultService.getAllDataModelDataframeInfo(dataModelId);
    return res;
  };

  const { data, isLoading, status, error, refetch } = useQuery<GetMultipleDataModelDataframe_Out, ApiError>(
    ['dataModels'],
    fetchAllDataFrames,
    {
      refetchOnMount: 'always'
    }
  );

  const tableData: DataType[] = [];
  if (data) {
    for (let i = 0; i < data.data_model_dataframes.length; ++i) {
      tableData.push({
        key: i.toString(),
        name: data.data_model_dataframes[i].name,
        description: data.data_model_dataframes[i].description,
        publishDate: data.data_model_dataframes[i].creation_time,
      });
    }
  }

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Feature', dataIndex: 'feature', key: 'feature' },
    ];

    const featureData: ExpandedDataType[] = []; // the following section is temporary until the dynamic feature list is implemented
    const featureList: string[] = [];
    let featureIndex = 0;

    {FEATURE_LIST.map((feature, index) => (  
      featureList.push(
       feature.series_name) 
    ))}

    featureList.forEach((feature: any) => {
      featureData.push({
        key: featureIndex.toString(),
        feature: feature,
      });
      featureIndex++;
    });

    return <Table columns={columns} dataSource={featureData} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Created At', dataIndex: 'Created at', key: 'Created at' },
  ];

  //const [toggle, setToggle] = useState<boolean>(false);
  const [size, setSize] = useState<string>('default');

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
    console.log(e.target.value, "value");
  };


  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      <Box>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Box>
      <Table
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={tableData}
      />
    </Box>
  );
};

export default AntTable;