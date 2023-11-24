import TemplateResponseListSection from 'src/pages/TallulahEmailResponseTemplate/components/TemplateResponseListSection';
import styles from './ResponseTemplateSelection.module.css';
import { useEffect, useState } from 'react';
import { GetResponseTemplate_Out, ResponseTemplatesService } from 'src/tallulah-ts-client';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import ResponseTemplateCard from 'src/pages/TallulahEmailResponseTemplate/components/ResponseTemplateCard';
import CloseIcon from '@mui/icons-material/Close';

export interface IResponseTemplateSelection {
  setEmailSubject: (subject: string) => void;
  setEmailBody: (body: string) => void;
  setIsTemplateSelectionModalOpen: (isOpen: boolean) => void;
}

const ResponseTemplateSelection: React.FC<IResponseTemplateSelection> = ({
  setEmailSubject,
  setEmailBody,
  setIsTemplateSelectionModalOpen
}) => {
  const [templateList, setTemplateList] = useState<GetResponseTemplate_Out[]>([]);

  const fetchResponseTemplates = async () => {
    try {
      const response = await ResponseTemplatesService.getAllResponseTemplates();
      setTemplateList(response.templates);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSelect = (template: GetResponseTemplate_Out) => {
    console.log('template', template);
    if (template && template.subject) {
      setEmailSubject(template.subject);
    }
    if (template && template.body) {
      setEmailBody(template.body.content);
    }
    setIsTemplateSelectionModalOpen(false);
  };

  useEffect(() => {
    fetchResponseTemplates();
  }, []);

  const handleRefresh = () => {
    fetchResponseTemplates();
  };

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '10px'
        }}
      >
        <IconButton
          onClick={() => {
            setIsTemplateSelectionModalOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '1rem'
        }}
      >
        <Typography variant="h5">Select Template</Typography>
      </Box>
      <Box
        sx={{
          padding: '1rem'
        }}
      >
        {templateList && templateList.length > 0 ? (
          <Box>
            {templateList.map((_template, _index) => (
              <ResponseTemplateCard
                key={_template._id}
                data={_template}
                editable={false}
                selection={true}
                onSelect={handleOnSelect}
                handleRefresh={handleRefresh}
              />
            ))}
          </Box>
        ) : (
          <Box>No Template Responses Found</Box>
        )}
      </Box>
    </Box>
  );
};

export default ResponseTemplateSelection;
