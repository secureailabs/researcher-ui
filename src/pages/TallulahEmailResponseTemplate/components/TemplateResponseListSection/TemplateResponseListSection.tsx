import { useEffect, useState } from 'react';
import styles from './TemplateResponseListSection.module.css';
import { Box } from '@mui/material';
import ResponseTemplateCard from '../ResponseTemplateCard';
import { GetResponseTemplate_Out, ResponseTemplatesService } from 'src/tallulah-ts-client';

export interface ITemplateResponseListSection {}

const TemplateResponseListSection: React.FC<ITemplateResponseListSection> = ({}) => {
  const [templateList, setTemplateList] = useState<GetResponseTemplate_Out[]>([]);

  const fetchResponseTemplates = async () => {
    try {
      const response = await ResponseTemplatesService.getAllResponseTemplates();
      setTemplateList(response.templates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResponseTemplates();
  }, []);

  return (
    <Box>
      {templateList && templateList.length > 0 ? (
        <Box>
          {templateList.map((_template, _index) => (
            <ResponseTemplateCard key={_template._id} data={_template} />
          ))}
        </Box>
      ) : (
        <Box>No Template Responses Found</Box>
      )}
    </Box>
  );
};

export default TemplateResponseListSection;
