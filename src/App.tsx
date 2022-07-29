import './App.scss';
import TopAppBar from './components/top-app-bar';
import PickCivContainer from './components/pick-civ-container';
import CivList from './components/civ-list';


function App() {
  return (
    <div className='App'>
      <TopAppBar />
      <PickCivContainer />
      <CivList />
    </div>
  );
}

export default App;
