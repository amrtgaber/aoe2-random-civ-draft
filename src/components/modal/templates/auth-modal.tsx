import { FC } from 'react';

import './auth-modal.scss';

interface AuthModalProps {
  name: string;
  isSignup: boolean;
}

export const AuthModal: FC<AuthModalProps> = (props) => {
  const { name, isSignup } = props;

  return (
    <div className='auth-modal-container'>
      <input type='text' placeholder='email' className='auth-modal-input' />
      {isSignup && (
        <input
          type='text'
          placeholder='username (optional)'
          className='auth-modal-input'
        />
      )}
      <input
        type='password'
        placeholder='password'
        className='auth-modal-input'
      />
      {isSignup && (
        <input
          type='password'
          placeholder='confirm password'
          className='auth-modal-input'
        />
      )}
      <button className='auth-button'>{name}</button>
    </div>
  );
};
