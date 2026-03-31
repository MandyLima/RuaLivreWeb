import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import Register  from './pages/Register';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
