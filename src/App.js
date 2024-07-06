import './App.css';

import GlobalContextProvider from './context/globalContext';
import TaskPage from './pages/taskPage';
import Header from './components/cardComponents/header';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Login from './pages/login';
import Privacy from './pages/privacy';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalContextProvider>
          <Header />
          <Routes>
            <Route path="taskplanner/" element={<TaskPage />} />
            <Route path="taskplanner/Login" element={<Login />} />
            <Route path="taskplanner/Privacy" element={<Privacy />} />
          </Routes>
          <Link className='noUnderline' to="taskplanner/Privacy">Privacy</Link>
        </GlobalContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
