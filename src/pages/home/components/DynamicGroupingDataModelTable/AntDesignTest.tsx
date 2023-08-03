import { Box, CircularProgress, Tab } from '@mui/material';
import { Form, Radio, Table, TableColumnsType } from 'antd';
import FEATURE_LIST, { LONGITUDINAL_VARIABLES } from 'src/constants/featureVariable';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GetDataModel_Out, DefaultService, GetMultipleDataModelDataframe_Out, ApiError } from 'src/client';
import { SeriesDataModelType } from 'src/client';
import { TFileInformation } from 'src/pages/Datasets/components/DatasetPage/components/DatasetVersionPage/components/DatasetUpload/DatasetUpload';
import { LONGITUDINAL_DATA_MODEL } from 'src/constants/featureVariable';

interface DataType {
  key: React.Key;
  name?: string;
  description?: string;
  publishDate?: string | undefined;
  group?: string;
}

interface ExpandedDataType {
  key: React.Key;
  feature?: string;
  group?: string;
  model?: string;
}

interface Feature {
  key: React.Key;
  feature?: string;
  modelGroup?: string[];
}



/*const filteredDateFeatures = ( ) => {
  const dateFeatures: Feature[] = [];
  for (let i = 0; i <= 4; i++) {
  LONGITUDINAL_DATA_MODEL.list_data_frame_data_model[i].list_series_data_model
  .forEach((feature: any) => {
    if (feature._type_ === 'SeriesDataModelDate') {
      dateFeatures.push({
        key: feature.series_data_model_id,
        feature: feature.series_name,
        modelGroup: LONGITUDINAL_DATA_MODEL.list_data_frame_data_model[i].data_frame_name,
      });
    }
  });
}
  return dateFeatures;
}; */

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

  const defaultExpand = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Feature', dataIndex: 'feature', key: 'feature' },
    ];

    const featureData: ExpandedDataType[] = []; // the following section is temporary until the dynamic feature list is implemented
    const featureList: string[] = [];
    let featureIndex = 0;

    {
      FEATURE_LIST.map((feature, index) => (
        featureList.push(
          feature.series_name)
      ))
    }

    featureList.forEach((feature: any) => {
      featureData.push({
        key: featureIndex.toString(),
        feature: feature,
      });
      featureIndex++;
    });

    return <Table columns={columns} dataSource={featureData} pagination={false} />;
  }

  const groupExpand = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Group', dataIndex: 'group', key: 'group' },
    ];

    const groupData: ExpandedDataType[] = [];
    const groupList: string[] = [];
    let groupIndex = 0;

    for (const group in SeriesDataModelType) {
      groupList.push(group);
    }

    groupList.forEach((group: any) => {
      groupData.push({
        key: groupIndex.toString(),
        group: group,
      });
      groupIndex++;
    });

    return <Table columns={columns} dataSource={groupData} pagination={false} expandable={{ expandedRowRender: defaultExpand }} />;
  };

  const filteredFeatures = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Feature', dataIndex: 'feature', key: 'feature' },
      { title: 'Model Group', dataIndex: 'modelGroup', key: 'modelGroup' }
    ];

    const groupedFeatures: Feature[] = [];
    LONGITUDINAL_DATA_MODEL.list_data_frame_data_model.forEach((dataframe: any) => {
      dataframe.list_series_data_model
        .forEach((feature: any) => {
          if (feature.__type__ === 'SeriesDataModelUnique') {
            groupedFeatures.push({
              key: feature.series_data_model_id + feature.series_name,
              feature: feature.series_name,
              modelGroup: dataframe.data_frame_name,
            });
          }
        });
    });
    
    const uniqueList: Feature[] = []; 
    groupedFeatures.forEach((item: any) => {
      if (!uniqueList.includes(item.feature)) {
        uniqueList.push(item);
      } else {
        const toAdd = uniqueList.find((duplicate: any) => duplicate.feature === item.feature);
        toAdd?.modelGroup?.push(item.modelGroup);
      }
    });


    return <Table columns={columns} dataSource={uniqueList} pagination={false} />;
  };

  const groupData: DataType[] = [];
  const groupList: string[] = [];
  let groupIndex = 0;

  for (const group in SeriesDataModelType) {
    groupList.push(group);
  }

  groupList.forEach((group: any) => {
    groupData.push({
      key: groupIndex.toString(),
      group: group,
    });
    groupIndex++;
  });




  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Created At', dataIndex: 'Created at', key: 'Created at' },
  ];

  const Groupcolumns: TableColumnsType<DataType> = [
    { title: 'Group', dataIndex: 'group', key: 'group' },
  ];


  //const [toggle, setToggle] = useState<boolean>(false);
  const [size, setSize] = useState<string>('default');
  const [defaultView, setDefaultView] = useState<boolean>(true);

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
        className="default-table-view"
        columns={columns}
        expandable={{ expandedRowRender: defaultExpand }}
        dataSource={tableData}
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender: groupExpand }}
        dataSource={tableData}
      />
      <Table
        columns={Groupcolumns}
        expandable={{ expandedRowRender: filteredFeatures }}
        dataSource={groupData}
      />
    </Box>
  );
};

export default AntTable;