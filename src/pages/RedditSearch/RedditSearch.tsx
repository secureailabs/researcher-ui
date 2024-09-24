import { useNavigate, useParams } from 'react-router-dom';
import styles from './RedditSearch.module.css';
import {
  Context,
  FormDataService,
  FormTemplatesService,
  GetFormData_Out,
  GetMultipleFormData_Out,
  GetMultipleFormTemplate_Out,
  PatientChatService
} from 'src/tallulah-ts-client';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import logo from 'src/assets/images/array_insights_small.png';
import user_avatar from 'src/assets/images/users/avatar-3.png';
import SearchBar from 'src/components/SearchBar';
import Sort from '../TallulahPatientStory/PatientStory/components/Sort';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export interface IRedditSearch {
  sampleTextProp?: string;
}

// https://www.google.com/webhp?igu=1&gws_rd=ssl

const RedditSearch = () => {
  const { handleSubmit, control, getValues, formState, reset } = useForm({
    mode: 'onChange',
  });
  const [data, setData] = useState<any>([]);

  const onSubmit = (data: any) => {
    console.log(data);

    axios.get('https://www.reddit.com/search.json?sort=new&q=' + data.search)
      .then(response => {
        console.log(response);
        setData(response.data.data.children);
        reset();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Reddit Search</h3>
      <Box component="form" noValidate sx={{ mt: 1, width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="search"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={{ mt: 1, mb: 4 }}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              required
              fullWidth
              id="search"
              label="Enter text to search"
              autoComplete="text"
              autoFocus
            />
          )}
          rules={{ required: 'Search Text is required' }}
        />
        <Button
          disabled={!formState.isValid || formState.isSubmitted}
          onClick={handleSubmit(onSubmit)}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          Search
        </Button>
        <Table style={{width: "100%"}}>
          <TableHead>
          <TableRow>
            <TableCell className={styles.tableBorders}><Typography>Sub reddit</Typography></TableCell>
            <TableCell className={styles.tableBorders}><Typography>Author</Typography></TableCell>
            <TableCell className={styles.tableBorders}><Typography>Title</Typography></TableCell>
            <TableCell className={styles.tableBorders}><Typography>Image</Typography></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className={styles.tableBorders}><Typography><a href={"https://www.reddit.com/r/"+item.data.subreddit} target="_blank">{item.data.subreddit}</a></Typography></TableCell>
                <TableCell className={styles.tableBorders}><Typography><a href={"https://www.reddit.com/user/"+item.data.author} target="_blank">{item.data.author}</a></Typography></TableCell>
                <TableCell className={styles.tableBorders}><Typography><a href={"https://www.reddit.com/"+item.data.permalink} target="_blank">{item.data.title}</a></Typography></TableCell>
                <TableCell className={styles.tableBorders}>{'thumbnail' in item.data && item.data.thumbnail.startsWith('http') && (<img src={item.data.thumbnail} alt="thumbnail" />)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default RedditSearch;
