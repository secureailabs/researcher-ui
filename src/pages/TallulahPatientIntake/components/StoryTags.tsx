import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

const tags = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 }
];

const StoryTags: React.FC = () => {
  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={tags.map((option) => option.title)}
        freeSolo
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
