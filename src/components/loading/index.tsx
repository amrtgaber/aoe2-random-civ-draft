import { FC } from 'react';

import './loading.scss';

export interface ILoadingProps {
  componentName: string;
}

export const Loading: FC<ILoadingProps> = (props) => {
  const { componentName } = props;

  return (
    <>
      <p className='loading-text'>loading {componentName}...</p>
      <video className='loading-video' autoPlay loop muted>
        <source
          src='/assets/videos/wonder-collapse/notre-dame-collapse.mp4'
          type='video/mp4'
        />
      </video>
    </>
  );
};
