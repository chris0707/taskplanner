import './App.css';

import GlobalContextProvider from './context/globalContext';
import TaskPage from './pages/taskPage';
import Header from './components/cardComponents/header';
import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Login from './pages/login';
import Privacy from './pages/privacy';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const clientId = "608419629230-ltetaerabjp9nu9hmjmqut1l5cj1229l.apps.googleusercontent.com";
  

  return (
    <div>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <GlobalContextProvider>
            <Header />
            <Routes>
              <Route path="taskplanner/" element={<TaskPage />} />
              <Route
                path="taskplanner/Login"
                element={<Login cid={clientId} />}
              />
              <Route path="taskplanner/Privacy" element={<Privacy />} />
            </Routes>
            <Link className="noUnderline" to="taskplanner/Privacy">
              Privacy
            </Link>
          </GlobalContextProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
