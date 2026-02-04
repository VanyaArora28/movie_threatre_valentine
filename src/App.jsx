import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Lobby from './pages/Lobby'
import DayModal from './pages/DayModal'
import Feb14Premiere from './pages/Feb14Premiere'

function App() {
    return (
        <Router>
            <div className="film-grain">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/screening/:day" element={<DayModal />} />
                    <Route path="/premiere" element={<Feb14Premiere />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
