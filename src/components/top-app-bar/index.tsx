import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { isFulfilled, isInit } from '../../store/fetch-status-service';
import { fetchVersion, selectVersion } from '../../store/slices/version-slice';

import { Modal } from '../modal';
import { AuthModal } from '../modal/templates/auth-modal';
import './top-app-bar.scss';

export const TopAppBar: FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { gameVersion, versionStatus } = useAppSelector(selectVersion);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isInit(versionStatus)) {
      dispatch(fetchVersion());
    }
  }, [versionStatus]);

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
        <button className='login-button' onClick={showLoginModal}>
          Login
        </button>
        <Modal show={isLoginModalOpen} dismissFn={hideLoginModal}>
          <AuthModal name='Login' isSignup={false} />
        </Modal>

        <button className='signup-button' onClick={showSignupModal}>
          Sign Up
        </button>
        <Modal show={isSignupModalOpen} dismissFn={hideSignupModal}>
          <AuthModal name='Sign up' isSignup={true} />
        </Modal>
      </div>
    </div>
  );
};
