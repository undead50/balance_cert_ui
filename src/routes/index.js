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
import Notfound from '../pages/System/404';
import RiskRankingReport from '../pages/Report/RiskRankingReport';
import RiskStatus from '../pages/Report/RiskStatus';
import SyncBranch from '../pages/Branch';
import MultiStepForm from '../pages/BalanceCertificate';
import TemplateTable from '../pages/Template';
import VerificationDetails from '../pages/BalanceCertificate/Verification';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<Notfound />}></Route>
        <Route path="verification" element={<VerificationDetails/>}/>
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
          <Route path="balcert-search" element={<MultiStepForm/>}/>
          <Route
            path="riskassessment/:riskassessmentID"
            element={<AccountOpeningForm />}
          />
          <Route path="assessmentindex/:dashboardStatus" element={<RiskTable />} />
          <Route path="assessmentindex" element={<RiskTable />} />
          <Route path="/report" element={<ReportTable />} />
          <Route path="/riskRankingReport" element={<RiskRankingReport />} />
          <Route path="/riskStatus" element={<RiskStatus/>}/>
          <Route path="categoryIndex" element={<CategoryIndex />} />
          <Route path="questionIndex" element={<QuestionIndex />} />
          <Route path="previlageIndex" element={<UserPrivilegesTable />} />
          <Route path="markingIndex" element={<MarkTable />} />
          <Route path="initiateAssessment" element={<InitiateAssessment />} />
          <Route path="syncBranch" element={<SyncBranch />} />
          <Route path="template" element={<TemplateTable />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
