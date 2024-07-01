import { FC, MouseEvent, ReactNode, useRef } from 'react';

import './modal.scss';

interface ModalProps {
  show: boolean;
  dismissFn: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = (props) => {
  const { show, dismissFn, children } = props;

  if (!children) {
    return null;
  }

  const modalEl = useRef<HTMLDivElement>(null);

  const handleDismiss = (event: MouseEvent<HTMLDivElement>) => {
    dismissFn();
  };

  return (
    <>
      {show && (
        <div ref={modalEl} className='modal-container'>
          <div className='modal-scrim' onClick={handleDismiss} />
          <div className='modal'>{children}</div>
        </div>
      )}
    </>
  );
};
