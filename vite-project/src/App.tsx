import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage.tsx';
import Register  from './pages/Register';
import './App.css'
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account-settings" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;