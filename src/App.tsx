import { TopAppBar } from './components/top-app-bar';
import { DraftCiv } from './components/draft-civ';
import { CivPool } from './components/civ-pool';
import { CivPoolSettings } from './components/civ-pool-settings';
import { Footer } from './components/footer';
import { Separator } from './components/separator';
import { Snackbar } from './components/snackbar';

import './App.scss';

function App() {
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
