import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // ייבוא עמוד Dashboard

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* עמוד Dashboard */}
            </Routes>
        </Router>
    );
}

export default App;
