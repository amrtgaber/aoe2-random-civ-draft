import { FC } from 'react';

import './footer.scss';

export const Footer: FC = () => {
  return (
    <footer>
      <h2 className='credits-title'>Credits</h2>
      <div className='credits-text'>
        <p>
          Created by Amr Gaber (aoe2.net profile:{' '}
          <a
            href='https://aoe2.net/#profile-2235709'
            target='_blank'
            rel='noreferrer'
          >
            debrijja
          </a>
          ) (2022) •{' '}
          <a
            href='https://github.com/amrtgaber/aoe2-random-civ-draft/tree/main'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>{' '}
          •{' '}
          <a
            href='https://paypal.me/amrtgaber'
            target='_blank'
            rel='noreferrer'
          >
            Donate
          </a>{' '}
          •{' '}
          <a
            href='https://www.youtube.com/c/debrijja'
            target='_blank'
            rel='noreferrer'
          >
            youtube
          </a>
        </p>
        <p>
          Thank you to <a href='https://siegeengineers.org/'>Siege Engineers</a>
          . Inspiration and some assets were taken (wololo 11) from their
          projects. If you like this app you might also like{' '}
          <a href='https://aoe2techtree.net/'>aoe2techtree.net</a>
          {' and '}
          <a href='https://www.aoe2database.com/'>aoe2database.com</a>.
        </p>
        <p>
          Age of Empires II © Microsoft Corporation. Age of Empires II Random
          Civilization Draft was created under Microsoft&apos;s &quot;
          <a href='https://www.xbox.com/en-us/developers/rules'>
            Game Content Usage Rules
          </a>
          &quot; using assets from Age of Empires II and it is not endorsed by
          or affiliated with Microsoft.
        </p>
      </div>
    </footer>
  );
};
