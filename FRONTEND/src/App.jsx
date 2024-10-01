import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/home'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
