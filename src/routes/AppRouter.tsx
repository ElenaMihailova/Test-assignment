import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from '../pages/auth-page/AuthPageContainer';
import { CompanyPage } from '../pages/company-page/CompanyPageContainer';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/company"
          element={<ProtectedRoute><CompanyPage /></ProtectedRoute>}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;