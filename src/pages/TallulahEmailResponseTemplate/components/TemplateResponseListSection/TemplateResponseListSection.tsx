import { useEffect, useState } from 'react';
import styles from './TemplateResponseListSection.module.css';
import { Box } from '@mui/material';
import ResponseTemplateCard from '../ResponseTemplateCard';
import { GetResponseTemplate_Out, ResponseTemplatesService } from 'src/tallulah-ts-client';

export interface ITemplateResponseListSection {
  templateList: GetResponseTemplate_Out[];
  handleRefresh: () => void;
}

const TemplateResponseListSection: React.FC<ITemplateResponseListSection> = ({ templateList, handleRefresh }) => {
  return (
    <Box>
      {templateList && templateList.length > 0 ? (
        <Box>
          {templateList.map((_template, _index) => (
            <ResponseTemplateCard key={_template._id} data={_template} handleRefresh={handleRefresh} />
          ))}
        </Box>
      ) : (
        <Box>No Template Responses Found</Box>
      )}
    </Box>
  );
};

export default TemplateResponseListSection;
