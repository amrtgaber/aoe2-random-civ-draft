import { TopAppBar } from './components/top-app-bar';
import { CivDraftResultContainer } from './components/civ-draft-result-container';
import { CivDraft } from './components/civ-draft';
import { CivDraftParameters } from './components/civ-draft-parameters';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <TopAppBar />
      <CivDraftResultContainer />
      <CivDraft />
      <CivDraftParameters />
    </div>
  );
}

export default App;
