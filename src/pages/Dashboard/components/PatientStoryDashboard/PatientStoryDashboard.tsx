import { Box } from '@mui/material';
import styles from './PatientStoryDashboard.module.css';
import {
  DashboardTemplatesService,
  DashboardWidget,
  FormTemplatesService,
  GetDashboardTemplate_Out,
  GetFormTemplate_Out,
  GetMultipleFormTemplate_Out
} from 'src/tallulah-ts-client';
import { useEffect, useState } from 'react';
import DashboardItem from '../DashboardItem';

export interface IPatientStoryDashboard {
  sampleTextProp?: string;
}

export interface IDashboardTemplate extends GetDashboardTemplate_Out {
  response?: any;
  isResponseLoading?: boolean;
}

const PatientStoryDashboard: React.FC<IPatientStoryDashboard> = ({ sampleTextProp }) => {
  const [formTemplates, setFormTemplates] = useState<GetFormTemplate_Out[]>([]);
  const [dashboardTemplates, setDashboardTemplates] = useState<IDashboardTemplate[]>([]);

  const fetchPublishedFormTemplate = async () => {
    try {
      const res: GetMultipleFormTemplate_Out = await FormTemplatesService.getAllFormTemplates();
      // filter the published state
      const filteredData: GetFormTemplate_Out[] = res.templates.filter((formTemplate) => formTemplate.state === 'PUBLISHED');
      setFormTemplates(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const executeDashboardTemplates = async (templates: any) => {
    for (const dashboardTemplate of templates) {
      try {
        const res: GetDashboardTemplate_Out = await DashboardTemplatesService.executeDashboardTemplate(
          dashboardTemplate.id,
          dashboardTemplate.repository_id
        );
        setDashboardTemplates((prev) => {
          return prev.map((template) => {
            if (template.id === dashboardTemplate.id) {
              return {
                ...template,
                response: res,
                isResponseLoading: false
              };
            }
            return template;
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchDashboardTemplates = async () => {
    // use promise.all to fetch all dashboard templates
    const promises = formTemplates.map((formTemplate) => {
      return DashboardTemplatesService.getDashboardTemplates(formTemplate.id);
    });

    const res = await Promise.all(promises).then((res) => {
      const dashboardTemplates = res.map((dashboardTemplate) => {
        return {
          ...dashboardTemplate[0],
          isResponseLoading: false
        };
      });
      setDashboardTemplates(dashboardTemplates);
      executeDashboardTemplates(dashboardTemplates);
      return res;
    });
  };

  useEffect(() => {
    if (formTemplates.length > 0) {
      fetchDashboardTemplates();
    }
  }, [formTemplates]);

  useEffect(() => {
    fetchPublishedFormTemplate();
  }, []);

  const getResponseObject = (dashboard: IDashboardTemplate, widget: DashboardWidget) => {
    if (dashboard.response) {
      return dashboard.response[widget.name];
    }
    return null;
  };

  return (
    <Box>
      {dashboardTemplates.map((dashboard: any) => (
        <Box key={dashboard.id}>
          <Box>{dashboard.name}</Box>
          {dashboard.layout?.widgets?.map((widget: DashboardWidget) => (
            <DashboardItem widget={widget} response={getResponseObject(dashboard, widget)} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default PatientStoryDashboard;
