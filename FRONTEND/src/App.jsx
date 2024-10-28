import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/home'
import StudentHome from './pages/estudiante/studentHome'
import TutorHome from './pages/tutor/tutorHome'
import PrincipalEstudiante from './pages/estudiante/principalEstudiante'
import { AuthProvider } from './context/AuthContext/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/tutor" element={<TutorHome/>}></Route>
          <Route path="/estudiante" element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App;
