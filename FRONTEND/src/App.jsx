import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/home'
import PrincipalEstudiante from './pages/estudiante/principalEstudiante'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/estudiante" element={<PrincipalEstudiante/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
