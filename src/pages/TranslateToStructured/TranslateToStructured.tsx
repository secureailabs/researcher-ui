import { Box, Button, CircularProgress, TextField } from '@mui/material';
import styles from './TranslateToStructured.module.css';
import { useState } from 'react';
import { set } from 'react-hook-form';

export interface ITranslateToStructured {}

const TranslateToStructured: React.FC<ITranslateToStructured> = ({}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [insights, setInsights] = useState({
    'Patient Name': 'Not Provided',
    'Patient Age': '22',
    'Primary Diagnoses': 'Leukemia',
    Events: [
      {
        Date: 'Spring 2011',
        Event: 'Diagnosis',
        Emotion: 'Shocked and devastated'
      },
      {
        Date: '2011-2015',
        Event: 'Four years of chemo, a clinical trial and a bone marrow transplant',
        Emotion: 'Depressed but determined'
      },
      {
        Date: '2015',
        Event: 'End of treatment, struggles with physical and psychological toll of illness',
        Emotion: 'Exhausted, lost, and overwhelmed'
      },
      {
        Date: 'Not provided',
        Event: 'Road trip around the United States, visiting strangers who had written to her',
        Emotion: 'Adventurous, hopeful, and grateful'
      },
      {
        Date: 'Not provided',
        Event: 'Acceptance of her body and its limitations',
        Emotion: 'Relieved and accepting'
      }
    ],
    Institutions: ['Paris Hospital', 'New York Times'],
    Summary:
      'At the tender age of 22, in the spring of 2011, the patient was diagnosed with leukemia, leaving her shocked and devastated. Over the next four years, she endured chemo, a clinical trial, and a bone marrow transplant, battling depression but determined to survive. In 2015, her treatment ended, but she struggled with the physical and psychological toll of her illness, feeling exhausted, lost, and overwhelmed. In an effort to find her way back to normalcy, she embarked on an adventurous and hopeful road trip around the United States, visiting strangers who had written to her. Eventually, she found acceptance in her body and its limitations, feeling a sense of relief and acceptance.'
  }); // [TODO] replace with actual type
  const [showInsights, setShowInsights] = useState(false);

  const handleExtractInsightsClick = () => {
    setShowLoading(true);
    // set 5 seconds timeout to simulate loading
    setTimeout(() => {
      setShowLoading(false);
      setShowInsights(true);
    }, 5000);
  };

  const syntaxHighlight = (json: any) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match: any) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span style="' + getStyleByClassName(cls) + '">' + match + '</span>';
      }
    );
  };

  const getStyleByClassName = (className: any) => {
    const styles = {
      key: 'color: brown;',
      string: 'color: green;',
      number: 'color: darkorange;',
      boolean: 'color: blue;',
      null: 'color: magenta;'
    };
    // @ts-ignore
    return styles[className] || '';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      {/* mui textfield with name enter text to gather insghts */}
      <TextField
        id="outlined-multiline-static"
        label="Enter Text to Gather Insights"
        multiline
        rows={4}
        variant="outlined"
        sx={{
          width: '80%',
          margin: '10px',
          backgroundColor: 'white'
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Enter a prompt"
        multiline
        rows={6}
        variant="outlined"
        defaultValue={
          " Reply only in json Leave  keys if not known Use the follwing keys: `Patient Name`, `Patient Age`, `Primary Diagnoses`, `Events`, `Institutions`, `Summary' Under the `Events` key list all events in the patients treatment add `Date` if known. In every event under the key `Emotion` also list a assement of the emotional state of the patient during that event. Under the key `Institutions` list all institutions and organisations the patient interacted with. Under the key Summary write a summary of the key Events using the  Emotion for the tone in the sentence. Make the Summary a compelling and cohesive life story"
        }
        sx={{
          width: '80%',
          margin: '10px',
          backgroundColor: 'white'
        }}
      />
      <Button
        variant="contained"
        sx={{
          margin: '10px'
        }}
        onClick={handleExtractInsightsClick}
      >
        Extract Insights
      </Button>
      {showLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {/* if showInsights then display the json in insights with proper formatting */}
      {showInsights && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden' // Ensure the Box itself does not scroll
          }}
        >
          <pre
            style={{
              textAlign: 'left',
              whiteSpace: 'pre-wrap', // Allows the text to wrap
              wordWrap: 'break-word', // Breaks the words to prevent overflow
              maxWidth: '80%', // Sets a max width to encourage wrapping within the parent
              overflowX: 'auto' // Allows horizontal scrolling if necessary
            }}
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(insights, null, 2)) }}
          ></pre>
        </Box>
      )}
    </Box>
  );
};

export default TranslateToStructured;
