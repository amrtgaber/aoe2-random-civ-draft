import { AnimationEvent, FC, MouseEvent, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectSnackbar,
  setSnackbarMessage,
} from '../../store/slices/snackbar-slice';

import './snackbar.scss';

export const Snackbar: FC = () => {
  const { message } = useAppSelector(selectSnackbar);
  const DEFAULT_TIMEOUT = 5000; // 5s
  let timeout: NodeJS.Timeout;

  const dispatch = useAppDispatch();

  const snackbarEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    showSnackbar();
  }, [message]);

  const showSnackbar = () => {
    if (message && message.length > 0 && snackbarEl.current) {
      snackbarEl.current.classList.add('show');
    }
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    timeout = setTimeout(() => handleDismiss(event), DEFAULT_TIMEOUT);
  };

  const handleDismiss = (
    event: AnimationEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => {
    const el = event.target as HTMLDivElement;
    el.classList.remove('show');
    clearTimeout(timeout);
    dispatch(setSnackbarMessage(''));
  };

  return (
    <>
      {message && message.length > 0 && (
        <div className='snackbar-container'>
          <div
            ref={snackbarEl}
            className='snackbar'
            onAnimationEnd={handleAnimationEnd}
          >
            <div className='message'>{message}</div>
            <div className='dismiss' onClick={handleDismiss}>
              ✖
            </div>
          </div>
        </div>
      )}
    </>
  );
};
