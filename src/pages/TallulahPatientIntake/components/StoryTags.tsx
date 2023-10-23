import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Controller, set } from 'react-hook-form';

const tags = [
  { title: 'Acute Lymphoblastic Leukaemia' },
  { title: 'Patient' },
  { title: 'Asia/Pacific Islander'},
  { title: 'Pediatric' },
  { title: 'Patient Registry'},
  { title: 'Transplant Recipient'}
];

interface StoryTagReset {
  resetTags: () => void;
}

const StoryTags: React.FC<StoryTagReset> = ({resetTags}) => {
  const [values, setValues] = React.useState<string[]>([]);
  const onChange = (_: any, value: React.SetStateAction<string[]>) => {
    setValues(value);
  };
 
  const clearSelected = () => {
    setValues([]);
  };


  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      
      <Autocomplete
        multiple
        id="tags-standard"
        clearText=''
        options={tags.map((option) => option.title)}
        freeSolo
        value={values}
        onChange={onChange}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            autoFocus
            {...params}
            variant="standard"
            placeholder="Press the Enter key to add tag"
          />
        )}
      />
    </Box>
  );
};

export default StoryTags;
