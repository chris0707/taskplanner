import './App.css';
import CardContainer from './components/cardContainer';
import InputBox from './components/inputBox';
import GlobalContextProvider from './context/globalContext'

function App() {
  return (
    <div>
      <GlobalContextProvider>
        <InputBox />
        <CardContainer />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
