import styles from './RedditSearch.module.css';
import { useState } from 'react';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

export interface IRedditSearch {
  sampleTextProp?: string;
}

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

  function openInNewTab(url: string) {
    window?.open(url, '_blank')?.focus();
  }

  const timezoneOffet = new Date().getTimezoneOffset()*60000;

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
        <Box>
          <Typography className={styles.resultsTitle}>Search Results</Typography>
          <Box>
          {data.map((item: any, index: number) => (
            <Grid className={styles.card} container>
              <Grid container item spacing={2}>
                <Grid item>
                  <Chip onClick={() => {openInNewTab("https://www.reddit.com/"+item.data.subreddit_name_prefixed)}} label={"Topic: " + item.data.subreddit_name_prefixed} variant="outlined" />
                </Grid>
                <Grid item>
                  <Chip onClick={() => {openInNewTab("https://www.reddit.com/user/"+item.data.author)}} label={"Author: " + item.data.author} variant="outlined" />
                </Grid>
                <Grid item>
                  <Chip label={new Date(item.data.created_utc*1000).toLocaleString()} variant="outlined" />
                </Grid>
              </Grid>
              <Grid className={styles.title} container item spacing={2} onClick={() => {openInNewTab("https://www.reddit.com"+item.data.permalink)}}>
                <Grid item xs>
                  <Typography className={styles.titleText}>{item.data.title}</Typography>
                </Grid>
                {'thumbnail' in item.data && item.data.thumbnail.startsWith('http') && (
                <Grid item xs={4}>
                  <img src={item.data.thumbnail} alt="thumbnail" />
                </Grid>
                )}
              </Grid>
            </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RedditSearch;
