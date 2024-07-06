import './App.css';

import GlobalContextProvider from './context/globalContext';
import TaskPage from './pages/taskPage';
import Header from './components/cardComponents/header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalContextProvider>
          <Header />
          <Routes>
            <Route path="taskplanner/" element={<TaskPage />} />
            <Route path="taskplanner/Login" element={<Login />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
