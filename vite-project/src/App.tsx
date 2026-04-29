import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage.tsx';
import Register  from './pages/Register';
import './App.css'
import Login from './pages/Login';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;