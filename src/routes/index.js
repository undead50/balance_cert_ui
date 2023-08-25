import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Auth/Login';
import Create from '../pages/Audit/create';
import Index from '../pages/Audit/index';
import Dashboard from '../pages/Dashboard';
import React from 'react';
import AdminLayout from '../containers/AdminLayout';
import AccountOpeningForm from '../pages/AuditAssement';
import CategoryIndex from '../pages/Cateogry';
import QuestionIndex from '../pages/Question';
import UserPrivilegesTable from '../pages/Previlage';
import RiskTable from '../pages/Risk';
import ProtectedRoute from '../components/ProtectedRoute';
import MarkTable from '../pages/Mark';
import ReportTable from '../pages/Report';
import InitiateAssessment from '../pages/Risk/InitiateAssessment';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="createAudit" element={<Create />} />
          <Route path="indexAudit" element={<Index />} />
          <Route path="riskassessment" element={<AccountOpeningForm />} />
          <Route
            path="riskassessment/:riskassessmentID"
            element={<AccountOpeningForm />}
          />
          <Route path="assessmentindex" element={<RiskTable />} />
          <Route path="/report" element={<ReportTable />} />
          <Route path="categoryIndex" element={<CategoryIndex />} />
          <Route path="questionIndex" element={<QuestionIndex />} />
          <Route path="previlageIndex" element={<UserPrivilegesTable />} />
          <Route path="markingIndex" element={<MarkTable />} />
          <Route path="initiateAssessment" element={<InitiateAssessment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
