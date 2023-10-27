import { useState } from 'react';
import styles from './TemplateResponseListSection.module.css';
import { Box } from '@mui/material';
import ReponseTemplateCard from '../ResponseTemplateCard';

export interface ITemplateResponseListSection {}

const SAMPLE_TEMPLATE_RESPONSES = [
  {
    id: 1,
    name: 'Template Response 1',
    subject: 'Template Response 1 Subject',
    body: `<body>    <h1>Hello, John!</h1>    <p>This is a sample email with HTML formatting. Here's what you can do with HTML in your emails:</p>        <ul>        <li><strong>Bold Text:</strong> <em>This text is bold and italicized.</em></li>        <li><a href="https://www.example.com">Hyperlinks:</a> Click the link to visit our website.</li>        <li><u>Underlined Text:</u> You can underline text as well.</li>    </ul>        <p>Don't forget, you can also include images:</p>    <img src="https://via.placeholder.com/150" alt="Sample Image">        <p>If you have any questions, feel free to <a href="mailto:contact@example.com">contact us</a>.</p>        <p>Best regards,<br>    Your Name</p></body>`,
    lastUpdated: '2021-10-01'
  },
  {
    id: 2,
    name: 'Template Response 2',
    subject: 'Template Response 2 Subject',
    body: '<p>Template Response 1 Body</p>',
    lastUpdated: '2021-10-02'
  },
  {
    id: 3,
    name: 'Template Response 3',
    subject: 'Template Response 3 Subject',
    body: '<p>Template Response 1 Body</p>',
    lastUpdated: '2021-10-03'
  }
];

const TemplateResponseListSection: React.FC<ITemplateResponseListSection> = ({}) => {
  const [templateList, setTemplateList] = useState<any[]>(SAMPLE_TEMPLATE_RESPONSES);

  return (
    <Box>
      {templateList && templateList.length > 0 ? (
        <Box>
          {templateList.map((_template, _index) => (
            <ReponseTemplateCard key={_template.id} data={_template} />
          ))}
        </Box>
      ) : (
        <Box>No Template Responses Found</Box>
      )}
    </Box>
  );
};

export default TemplateResponseListSection;
