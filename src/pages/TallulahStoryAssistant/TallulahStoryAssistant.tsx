import { Box, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import styles from './TallulahStoryAssistant.module.css';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import SuggestionInput from './components/SuggestionInput';
import logo from 'src/assets/images/array_insights_small.png';
import avatar from 'src/assets/images/users/avatar-1.png';

export interface ITallulahStoryAssistant {
  sampleTextProp: string;
}

const TallulahStoryAssistant: React.FC<ITallulahStoryAssistant> = ({ sampleTextProp }) => {
  const [inputText, setInputText] = useState<string>('');
  const [conversationList, setConversationList] = useState<any[]>([]);
  const [gptCompletion, setGptCompletion] = useState<any[]>([]);

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      const newText = e.target.value;
      setConversationList([...conversationList, newText]);
      setInputText('');
    }
  };

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          paddingBottom: '60px'
        }}
      >
        {conversationList.map((conversation, index) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                padding: '20px'
              }}
            >
              <img src={avatar} alt="Sail-Logo" width="30" />

              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {conversation}
              </Typography>
            </Box>
            <Box className={styles.gptCompletion}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: gptCompletion[index] }} />
                <img src={logo} alt="Sail-Logo" width="30" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={styles.chatInputBox}>
        <SuggestionInput
          sampleTextProp={sampleTextProp}
          conversationList={conversationList}
          setConversationList={setConversationList}
          gptCompletion={gptCompletion}
          setGptCompletion={setGptCompletion}
        />
      </Box>
    </Box>
  );
};

export default TallulahStoryAssistant;
