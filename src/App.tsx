import { TopAppBar } from './components/top-app-bar';
import { CivDraftResultContainer } from './components/civ-draft-result-container';
import { CivDraft } from './components/civ-draft';
import { CivDraftParameters } from './components/civ-draft-parameters';
import { Footer } from './components/footer';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <TopAppBar />
      <CivDraftResultContainer />
      <CivDraft />
      <CivDraftParameters />
      <Footer />
    </div>
  );
}

export default App;
