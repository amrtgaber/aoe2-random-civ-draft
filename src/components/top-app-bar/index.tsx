import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  isFulfilled,
  isInit,
  isLoading,
} from '../../store/fetch-status-service';
import { fetchVersion, selectVersion } from '../../store/slices/version-slice';

import { authLogout, selectAuth } from '../../store/slices/auth-slice';
import {
  selectUsers,
  userGet,
  userLogout,
} from '../../store/slices/users-slice';
import { Modal } from '../modal';
import { AuthModal } from '../modal/templates/auth-modal';
import './top-app-bar.scss';

export const TopAppBar: FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { gameVersion, versionStatus } = useAppSelector(selectVersion);
  const { loginStatus, signupStatus, logoutStatus } =
    useAppSelector(selectAuth);
  const { userGetStatus, user } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInit(versionStatus)) {
      dispatch(fetchVersion());
    }
  }, [versionStatus]);

  useEffect(() => {
    if (isFulfilled(loginStatus) || isFulfilled(signupStatus)) {
      dispatch(userGet());
    }
  }, [loginStatus, signupStatus]);

  const showSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const hideSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const showLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const hideLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(userLogout());
  };

  return (
    <div className='top-app-bar'>
      <div className='padding'></div>
      <div className='logo-container'>
        <a
          className='logo'
          href='https://www.ageofempires.com/games/aoeiide'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/assets/images/game-images/aoe_logo.png' alt='aoe 2 logo' />
        </a>
        <div className='app-title'>Random Civilization Draft</div>
        {isFulfilled(versionStatus) && (
          <div className='game-version'>Game version: {gameVersion}</div>
        )}
      </div>
      <div className='auth-container'>
        {(!isFulfilled(signupStatus) || !isFulfilled(loginStatus)) && (
          <>
            <button className='login-button' onClick={showLoginModal}>
              Login
            </button>
            <Modal show={isLoginModalOpen} dismissFn={hideLoginModal}>
              <AuthModal
                name='Login'
                isSignup={false}
                dismissFn={hideLoginModal}
              />
            </Modal>

            <button className='signup-button' onClick={showSignupModal}>
              Sign Up
            </button>
            <Modal show={isSignupModalOpen} dismissFn={hideSignupModal}>
              <AuthModal
                name='Sign up'
                isSignup={true}
                dismissFn={hideSignupModal}
              />
            </Modal>
          </>
        )}
        {isLoading(userGetStatus) && <div>Loading...</div>}
        {isFulfilled(userGetStatus) && (
          <>
            <div>{user?.email}</div>
            <button className='logout-button' onClick={handleLogout}>
              logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
