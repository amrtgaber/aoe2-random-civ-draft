import { FC, useEffect, useRef, useState } from 'react';

import { AuthBody } from '../../../api/auth/auth-api';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { isFulfilled, isLoading } from '../../../store/fetch-status-service';
import {
  authLogin,
  authSignup,
  selectAuth,
} from '../../../store/slices/auth-slice';
import './auth-modal.scss';

// copied from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const EMAIL_VALIDATION_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface AuthModalProps {
  name: string;
  isSignup: boolean;
  dismissFn: () => void;
}

export const AuthModal: FC<AuthModalProps> = (props) => {
  const { name, isSignup, dismissFn } = props;

  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { loginStatus, signupStatus } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFulfilled(loginStatus) || isFulfilled(signupStatus)) {
      dismissFn();
    }
  }, [loginStatus, signupStatus]);

  const validateEmail = () => {
    let isValid = true;

    if (!emailRef || !emailRef.current?.value) {
      isValid = false;
      setEmailError('email is required');
    }

    if (
      isValid &&
      emailRef &&
      emailRef.current?.value &&
      emailRef.current.value.length > 2
    ) {
      if (!emailRef.current.value.match(EMAIL_VALIDATION_REGEX)) {
        isValid = false;
        setEmailError('please provide a valid email');
      }
    }

    if (isValid) {
      setEmailError(null);
    }
  };

  const validateUsername = () => {
    let isValid = true;

    if (usernameRef && usernameRef.current?.value) {
      if (usernameRef.current.value.length < 3) {
        isValid = false;
        setUsernameError('username must be at least 3 characters');
      }

      if (isValid && !usernameRef.current.value.match(/^[\w][\w-]+$/)) {
        isValid = false;
        setUsernameError(
          'username must include only letters, numbers, and dashes'
        );
      }
    }

    if (isValid) {
      setUsernameError(null);
    }
  };

  const validatePassword = () => {
    let isValid = true;

    if (!passwordRef || !passwordRef.current?.value) {
      isValid = false;
      setPasswordError('password is required');
    } else if (passwordRef.current.value.length < 8) {
      isValid = false;
      setPasswordError('password must be at least 8 characters');
    }

    if (isValid) {
      setPasswordError(null);
    }
  };

  const validateConfirmPassword = () => {
    let isValid = true;

    if (
      confirmPasswordRef &&
      confirmPasswordRef.current?.value &&
      passwordRef &&
      passwordRef.current?.value
    ) {
      if (confirmPasswordRef.current.value !== passwordRef.current.value) {
        isValid = false;
        setConfirmPasswordError('passwords do not match');
      }
    }

    if (isValid) {
      setConfirmPasswordError(null);
    }
  };

  const handleAuth = () => {
    if (emailError || usernameError || passwordError || confirmPasswordError) {
      console.log('errors');
      return;
    }

    const authDto: AuthBody = {
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    };

    if (usernameRef?.current && usernameRef.current?.value !== '') {
      authDto.username = usernameRef.current.value;
    }

    if (isSignup) {
      dispatch(authSignup(authDto));
    } else {
      dispatch(authLogin(authDto));
    }
  };

  const renderError = (message: string) => {
    return <div className='auth-error'>{message}</div>;
  };

  return (
    <div className='auth-modal-container'>
      <div className='auth-input-container'>
        <input
          type='email'
          placeholder='email'
          className='auth-modal-input'
          ref={emailRef}
          onChange={validateEmail}
        />
        {emailError && renderError(emailError)}
      </div>
      {isSignup && (
        <div className='auth-input-container'>
          <input
            type='text'
            placeholder='username (optional)'
            className='auth-modal-input'
            ref={usernameRef}
            onChange={validateUsername}
          />
          {usernameError && renderError(usernameError)}
        </div>
      )}
      <div className='auth-input-container'>
        <input
          type='password'
          placeholder='password'
          className='auth-modal-input'
          ref={passwordRef}
          onChange={validatePassword}
        />
        {passwordError && renderError(passwordError)}
      </div>
      {isSignup && (
        <div className='auth-input-container'>
          <input
            type='password'
            placeholder='confirm password'
            className='auth-modal-input'
            ref={confirmPasswordRef}
            onChange={validateConfirmPassword}
          />
          {confirmPasswordError && renderError(confirmPasswordError)}
        </div>
      )}
      <button className='auth-button' onClick={handleAuth}>
        {name}
      </button>
      {isLoading(loginStatus) ||
        (isLoading(signupStatus) && <div>please wait...</div>)}
    </div>
  );
};
