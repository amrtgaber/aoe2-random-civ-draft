import { useEffect } from 'react';
import './App.scss';
import { useAppDispatch } from './hooks';
import { authRefresh } from './store/slices/auth-slice';
import { CivPoolContainer } from './components/civ-pool-container';
import { TechTreeFilter } from './components/tech-tree-filter';
import { DraftCiv } from './components/draft-civ';
import { Footer } from './components/footer';
import { Separator } from './components/separator';
import { Snackbar } from './components/snackbar';
import { TopAppBar } from './components/top-app-bar';

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
      <CivPoolContainer />

      <Separator />
      <TechTreeFilter />

      <Separator />
      <Footer />
      <Snackbar />
    </div>
  );
}

export default App;
