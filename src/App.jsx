import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProjectSelection from './components/ProjectSelection';
import QuestionnaireForm from './components/QuestionnaireForm';
import Congrats from './components/Congrats';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <ProjectSelection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/questionnaire/:project" 
          element={
            <ProtectedRoute>
              <QuestionnaireForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/congrats" 
          element={
            <ProtectedRoute>
              <Congrats />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const isValid = localStorage.getItem('juryCodeValid') === 'true';
  return isValid ? children : <Navigate to="/" replace />;
}

export default App;