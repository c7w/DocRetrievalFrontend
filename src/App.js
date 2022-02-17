import { Provider, useSelector } from 'react-redux';
import './App.css';
import SearchBox from './SearchBox/SearchBox';
import ResultBox from './ResultBox/ResultBox';
import store, { getLoading, getQuery, getResult } from './Store/Store'

function App() {

  return (
      <main>
        <SearchBox />
        <ResultBox />
      </main>
  );
}

export default App;
