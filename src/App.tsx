import { TopAppBar } from './components/top-app-bar';
import { CivDraftParameters } from './components/civ-draft-parameters';
import { CivDraftContainer } from './components/civ-draft-container';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <TopAppBar />
      <CivDraftContainer />
      <CivDraftParameters />
    </div>
  );
}

export default App;
