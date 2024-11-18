import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/home/main/home';
import StudentHome from './pages/estudiante/main/studentHome';
import TutorHome from './pages/tutor/main/tutorHome';
import { AuthProvider } from './context/AuthContext/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import StudentIni from './pages/student/main/StudentHome';
import 'react-toastify/dist/ReactToastify.css';
import { TutorProvider } from './context/TutorContext/TutorContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/t" element={
            <TutorProvider>
                <StudentIni />
            </TutorProvider>
              } />
            <Route
                path="/tutor"
                element={
                    <ProtectedRoute requiredRole="Tutor">
                        <TutorHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/estudiante"
                element={
                    <ProtectedRoute requiredRole="Estudiante">
                        <StudentHome />
                    </ProtectedRoute>
                }
            />
          </Routes>
        </Router>
        {/* Agrega ToastContainer aquí para que esté disponible en toda la aplicación */}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </AuthProvider>
    </>
  );
}

export default App;
