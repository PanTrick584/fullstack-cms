import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css'
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <AppProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* <Route path="/contact" element={<ContactPage />} /> */}
            </Routes>
        </Router>
        </AppProvider>
        
    );
}

export default App
