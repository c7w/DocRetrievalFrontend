import { Provider, useSelector } from 'react-redux';
import './App.css';
import SearchBox from './SearchBox/SearchBox';
import ResultBox from './ResultBox/ResultBox';
import store, { getLoading, getQuery, getResult } from './Store/Store'
import Text from "antd/es/typography/Text";

function App() {

  return (
      <>
          <main>
            <SearchBox />
            <ResultBox />
          </main>
          <footer>
              <p style={{fontFamily: 'Consolas', textAlign: 'center', fontSize: '24px'}}>© 2022 THUNLP. All rights reserved.</p>
          </footer>
      </>
  );
}

export default App;
