import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/Auth/Login';
import Create from '../pages/Audit/create';
import Index from '../pages/Audit/index';
import Information from '../pages/Dashboard/Information';
import React from 'react';
import AdminLayout from '../containers/AdminLayout';
import AccountOpeningForm from '../pages/AuditAssement';
import CategoryIndex from '../pages/Cateogry';
import QuestionIndex from '../pages/Question';
import UserPrivilegesTable from '../pages/Previlage';
import RiskTable from '../pages/Risk';
import ProtectedRoute from '../components/ProtectedRoute';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<LoginPage/>}></Route>
        <Route  element={<AdminLayout/>}>
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="createAudit" element={<Create/>}/>
          <Route path="info" element={<Information />}/>
          <Route path="indexAudit" element={<Index/>}/>
          <Route path="riskassessment" element={<ProtectedRoute><AccountOpeningForm/></ProtectedRoute>}/>
          <Route path="assessmentindex" element={<RiskTable/>}/>
          <Route path="categoryIndex" element={<CategoryIndex/>}/>
          <Route path="questionIndex" element={<QuestionIndex/>}/>
          <Route path="previlageIndex" element={<UserPrivilegesTable/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
