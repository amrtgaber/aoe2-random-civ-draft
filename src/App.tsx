import { CivPool } from './components/civ-pool';
import { CivPoolSettings } from './components/civ-pool-settings';
import { DraftCiv } from './components/draft-civ';
import { Footer } from './components/footer';
import { Separator } from './components/separator';
import { Snackbar } from './components/snackbar';
import { TopAppBar } from './components/top-app-bar';

import { useEffect } from 'react';
import './App.scss';
import { useAppDispatch } from './hooks';
import { authRefresh } from './store/slices/auth-slice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { access_token, refresh_token } = localStorage;
    if (access_token && refresh_token) {
      dispatch(authRefresh());
    }
  }, []);

  return (
    <div className='App'>
      <TopAppBar />

      <Separator />
      <DraftCiv />

      <Separator />
      <CivPool />

      <Separator />
      <CivPoolSettings />

      <Separator />
      <Footer />
      <Snackbar />
    </div>
  );
}

export default App;
