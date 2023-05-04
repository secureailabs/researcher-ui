/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useEffect, useState } from 'react';

interface IConf {
  msg: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | undefined;
}

const useNotification = (): [any] => {
  const [conf, setConf] = useState<IConf>({
    msg: '',
    variant: 'info'
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key: any): JSX.Element => (
    <Fragment>
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </Fragment>
  );
  useEffect(() => {
    if (conf?.msg) {
      enqueueSnackbar(conf.msg, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        variant: conf.variant,
        autoHideDuration: 5000,
        action
      });
    }
  }, [conf]);

  return [setConf];
};

export default useNotification;
