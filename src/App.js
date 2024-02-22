import './App.css';
import CardContainer from './components/cardContainer';
import InputBox from './components/inputBox';
import GlobalContextProvider from './context/globalContext';
import Header from './components/cardComponents/header';

function App() {
  return (
    <div>
      <GlobalContextProvider>
        <Header />
        <InputBox />
        <CardContainer />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
