import { TopAppBar } from './components/top-app-bar';
import { CivDraftResultContainer } from './components/civ-draft-result-container';
import { CivPool } from './components/civ-pool';
import { CivDraftParameters } from './components/civ-draft-parameters';
import { Footer } from './components/footer';
import { Separator } from './components/separator';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <TopAppBar />

      <Separator />
      <CivDraftResultContainer />

      <Separator />
      <CivPool />

      <Separator />
      <CivDraftParameters />

      <Separator />
      <Footer />
    </div>
  );
}

export default App;
