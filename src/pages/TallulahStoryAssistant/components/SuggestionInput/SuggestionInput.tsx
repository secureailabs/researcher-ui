import { useEffect, useRef, useState } from 'react';
import styles from './SuggestionInput.module.css';
import {
  Avatar,
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SAMPLE_DATA from 'src/pages/TallulahSearch/sample_search';
import CONVERSATION from 'src/pages/TallulahStoryAssistant/sampleConversation';
import { BASE_URL } from 'src/config';
import { Typography } from 'antd';

export interface ISuggestionInput {
  sampleTextProp: string;
  conversationList: any[];
  setConversationList: any;
  gptCompletion: any[];
  setGptCompletion: any;
}

const names: any[] = [];

SAMPLE_DATA.forEach((data) => {
  names.push(data._source);
});

const SuggestionInput: React.FC<ISuggestionInput> = ({
  sampleTextProp,
  conversationList,
  setConversationList,
  gptCompletion,
  setGptCompletion
}) => {
  const [showSuggestions, setShowSuggestions] = useState<any>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const [selectedNames, setSelectedNames] = useState<any>([]);
  const [atSymbolPositions, setAtSymbolPositions] = useState<number[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputText(value);

    const cursorPosition = inputRef?.current?.selectionEnd;

    const inputRect = inputRef?.current?.getBoundingClientRect();
    const inputTop = inputRect.top + window.scrollY;
    const suggestionTop = inputTop - 40;
    const suggestionLeft = cursorPosition * 8;

    setSuggestionPosition({ top: suggestionTop, left: suggestionLeft });

    const textAfterAtTheRate = value.substring(value.lastIndexOf('@') + 1, cursorPosition);

    if (showSuggestions && textAfterAtTheRate !== '') {
      const matchingNames = names.filter((name: any) => {
        return name.Name.toLowerCase().startsWith(textAfterAtTheRate.toLowerCase());
      });

      setSuggestions(matchingNames);
    } else {
      setSuggestions(names);
    }
  };

  const getAnswer = (question: string) => {
    // if question contain the word key in CONVERSATION then return the answer
    const answer = CONVERSATION.find((conversation) => {
      return question.includes(conversation.question);
    });

    return answer?.answer;
  };

  const handleSuggestionClick = (name: any) => {
    const cursorPosition = inputRef?.current?.selectionEnd;
    const textBeforeAtTheRate = inputText.substring(0, inputText.lastIndexOf('@') + 1);
    const textAfterAtTheRate = inputText.substring(inputText.lastIndexOf('@') + 1, cursorPosition);
    const textAfterCursor = inputText.substring(cursorPosition, inputText.length);
    const newValue = textBeforeAtTheRate + name + ' ' + textAfterCursor;
    setInputText(newValue);
    setSelectedNames([...selectedNames, name]);
    setShowSuggestions(false);
  };

  const completeWithGpt = (question: any) => {
    const answer = getAnswer(question);
    setGptCompletion([...gptCompletion, answer]);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      if (inputText.trimEnd() === '') return;

      // preprocess input text in below format
      // fetch all @names from input text and match with names array
      const matchingNames = names.filter((name: any) => {
        return inputText.includes(name.Name);
      });

      // include life story of all matching names in input text with proper format and append to conversation list
      // format would be like below
      // input text /n Name /n Life Story /n Name /n Life Story

      let updatedInputText = inputText;

      // append name and life story of each matching name in input text in new line
      matchingNames.forEach((name: any) => {
        updatedInputText += `\n\n${name.Name}\nAge:${name.Age}\nGender:${name.gender}\nJourney : ${name['Life Story']}`;
      });

      // append input text in conversation list
      setConversationList([...conversationList, updatedInputText]);

      setShowSuggestions(false);
      inputRef.current.selectionEnd = 0;
      setInputText('');

      // add delay of 3 seconds before calling gpt api
      setShowLoader(true);
      setTimeout(() => {
        completeWithGpt(updatedInputText);
        setShowLoader(false);
      }, 5000);
    } else if (e.key === '@') {
      // const matchingNames = names;
      // // setSuggestions(matchingNames);
      setShowSuggestions(true);
    } else if (e.key === ' ') {
      setShowSuggestions(false);
    } else if (e.key === 'Backspace') {
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* show loader */}
        {showLoader ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <CircularProgress />
            <Typography>Generating story .... please wait</Typography>
          </Box>
        ) : null}
      </Box>
      <FormControl
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '1px 2px 2px rgba(156, 156, 156, 0.25)',
          border: '1px solid #d1d1d1',
          borderRadius: '0.5rem',
          alignSelf: 'center'
        }}
        variant="outlined"
      >
        <OutlinedInput
          inputRef={inputRef}
          id="outlined-adornment-password"
          multiline
          rows={2}
          placeholder="Example: Write a fundraising story about John who has been diagnosed with cancer."
          endAdornment={
            <InputAdornment position="end">
              <SendIcon />
            </InputAdornment>
          }
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          sx={{
            '& fieldset': {
              border: 'none'
            }
          }}
        />
      </FormControl>

      {showSuggestions ? (
        <Paper
          style={{
            position: 'absolute',
            top: -150 + 'px',
            left: suggestionPosition.left + 'px',
            zIndex: 1,
            height: '150px',
            overflowY: 'scroll'
          }}
        >
          <List>
            {suggestions.map((name: any, index: any) => (
              <ListItem key={index} button onClick={() => handleSuggestionClick(name.Name)}>
                <ListItemAvatar>
                  <Avatar alt="Image Alt Text" src={require(`src/assets/images/users/${name.imageName}`)} />
                </ListItemAvatar>
                <ListItemText primary={name.Name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : null}
    </Box>
  );
};

export default SuggestionInput;
