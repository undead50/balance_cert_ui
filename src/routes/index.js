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

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<LoginPage/>}></Route>
        <Route  element={<AdminLayout/>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="createAudit" element={<Create/>}/>
          <Route path="info" element={<Information />}/>
          <Route path="indexAudit" element={<Index/>}/>
          <Route path="riskassessment" element={<AccountOpeningForm/>}/>
          <Route path="categoryIndex" element={<CategoryIndex/>}/>
          <Route path="questionIndex" element={<QuestionIndex/>}/>
          <Route path="previlageIndex" element={<UserPrivilegesTable/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
