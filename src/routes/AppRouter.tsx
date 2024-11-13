import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthPage } from '../pages/auth-page/AuthPageContainer';
import { CompanyPage } from '../pages/company-page/CompanyPageContainer';
import { EmptyPage } from '../pages/empty-page/EmptyPageContainer';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/company/:companyId/contact/:contactID"
          element={<ProtectedRoute><CompanyPage /></ProtectedRoute>}
        />
        <Route
          path="/list"
          element={<ProtectedRoute><EmptyPage /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
