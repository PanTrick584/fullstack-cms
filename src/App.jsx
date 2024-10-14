import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* <Route path="/contact" element={<ContactPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App
