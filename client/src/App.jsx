import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function Navigation() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <nav>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Welfare Compass</div>
      <div>
        <Link to="/">Home</Link>
        {!isAdmin && <Link to="/login">Admin Login</Link>}
        {isAdmin && <Link to="/dashboard">Dashboard</Link>}
        {isAdmin && <button onClick={handleLogout} className="logout-btn" style={{marginLeft:'20px'}}>Logout</button>}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;