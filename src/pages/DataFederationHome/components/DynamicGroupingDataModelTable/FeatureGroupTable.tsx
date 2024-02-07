import { Box, CircularProgress, Tab } from '@mui/material';
import { AutoComplete, Form, Input, Radio, Table, TableColumnsType } from 'antd';
import FEATURE_LIST, { LONGITUDINAL_VARIABLES } from 'src/constants/featureVariable';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GetDataModel_Out, DefaultService, ApiError } from 'src/client';
import { LONGITUDINAL_DATA_MODEL } from 'src/constants/featureVariable';

interface FeatureData {
  key: React.Key;
  name?: string;
  feature?: string;
  description?: string;
  publishDate?: string | undefined;
  group?: string;
  model?: string;
}

interface ExpandedDataType {
  key: React.Key;
  feature?: string;
}

const FeatureGroupTable: React.FC<any> = ({ data, isLoading }) => {
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();
  const [searchText, setSearchText] = useState<string>('');

  console.log('data');

  const defaultViewData: FeatureData[] = [];
  if (data) {
    for (let i = 0; i < data.dataframes.length; ++i) {
      defaultViewData.push({
        key: i.toString(),
        name: data.dataframes[i].name,
        description: data.dataframes[i].description,
        publishDate: data.dataframes[i].creation_time
      });
    }
  }

  const featureViewData: FeatureData[] = [];
  LONGITUDINAL_DATA_MODEL.list_data_frame_data_model.forEach((dataframe: any) => {
    dataframe.list_series_data_model.forEach((feature: any) => {
      featureViewData.push({
        key: feature.series_data_model_id + feature.series_name,
        feature: feature.series_name,
        group: feature.__type__,
        model: dataframe.data_frame_name
      });
    });
  });

  const defaultViewExpand = () => {
    const expandedTableColumns: TableColumnsType<ExpandedDataType> = [{ title: 'Feature', dataIndex: 'feature', key: 'feature' }];

    const featuresList: ExpandedDataType[] = [];
    let featureIndex = 0;

    featureViewData.forEach((item: FeatureData) => {
      featuresList.push({
        key: featureIndex.toString(),
        feature: item.feature
      });
      featureIndex++;
    });

    return <Table columns={expandedTableColumns} dataSource={featuresList} pagination={false} />;
  };

  const allSearchOptions = [{ value: '' }];
  featureViewData.forEach((option: any) => {
    allSearchOptions.push({ value: option.feature });
    allSearchOptions.push({ value: option.group });
    allSearchOptions.push({ value: option.model });
  });
  //remove duplicates for the drowdown display:
  const searchOptions = allSearchOptions.filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);

  const groupSort = (a: FeatureData, b: FeatureData, startChar: number) => {
    if (a.group && b.group) {
      console.log(a.group.charAt(startChar), 'a.group');
      return b.group.charCodeAt(startChar) - a.group.charCodeAt(startChar);
    } else {
      console.log('group is missing for this feature.');
      return 1;
    }
  };

  const featureSort = (a: FeatureData, b: FeatureData, startChar: number) => {
    if (a.feature && b.feature) {
      console.log(a.feature.charAt(startChar), 'a.feature');
      return b.feature.charCodeAt(startChar) - a.feature.charCodeAt(startChar);
    } else {
      console.log('feature is missing.');
      return 1;
    }
  };

  const modelSort = (a: FeatureData, b: FeatureData, startChar: number) => {
    if (a.model && b.model) {
      console.log(a.model.charAt(startChar), 'a.model');
      return b.model.charCodeAt(startChar) - a.model.charCodeAt(startChar);
    } else {
      console.log('model is missing for this feature.');
      return 1;
    }
  };

  const defaultViewColumns: TableColumnsType<FeatureData> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Created At', dataIndex: 'publishDate', key: 'publishDate' }
  ];

  const featureViewColumns: TableColumnsType<FeatureData> = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
      onFilter: (value, record: any) => {
        return (
          String(record.feature).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.group).toLowerCase().includes(value.toString().toLowerCase()) ||
          String(record.model).toLowerCase().includes(value.toString().toLowerCase())
        );
      },
      filteredValue: [searchText],
      sorter: (a, b) => featureSort(a, b, 0),
      sortDirections: ['descend']
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      filters: [
        {
          text: 'Categorical',
          value: 'SeriesDataModelCategorical'
        },
        {
          text: 'Date',
          value: 'SeriesDataModelDate'
        },
        {
          text: 'Interval',
          value: 'SeriesDataModelInterval'
        },
        {
          text: 'Date Time',
          value: 'SeriesDataModelDateTime'
        },
        {
          text: 'Unique',
          value: 'SeriesDataModelUnique'
        }
      ],
      sorter: (a, b) => groupSort(a, b, 15),
      sortDirections: ['descend']
    },
    {
      title: 'Data Model',
      dataIndex: 'model',
      key: 'model',
      filters: [
        {
          text: 'Static Table',
          value: 'static_data_table'
        },
        {
          text: 'Weight Table',
          value: 'longitudinal_weight_table'
        },
        {
          text: 'hba1c Table',
          value: 'longitudinal_hba1c_table'
        },
        {
          text: 'fbg Table',
          value: 'longitudinal_fbg_table'
        }
      ],
      sorter: (a, b) => modelSort(a, b, 0),
      sortDirections: ['descend']
    }
  ];

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
      {/* <Table
        className="default-table-view"
        columns={defaultViewColumns}
        expandable={{ expandedRowRender: defaultViewExpand }}
        dataSource={defaultViewData}
      /> */}
      <Box>
        <AutoComplete
          style={{ margin: '0 0 10px 0', width: '100%' }}
          options={searchOptions}
          filterOption={(inputValue, option) => option!.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          onSelect={(option) => setSearchText(option)}
          onSearch={(option) => setSearchText(option)}
        >
          <Input.Search size="large" placeholder="Search by feature, group, or data model" enterButton />
        </AutoComplete>
        <Table
          className="feature-table-view"
          columns={featureViewColumns}
          dataSource={featureViewData}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 440 }}
        />
      </Box>
    </Box>
  );
};

export default FeatureGroupTable;
