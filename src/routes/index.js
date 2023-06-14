import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/Auth/Login';
import Create from '../pages/Audit/create';
import Information from '../pages/Dashboard/Information';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/createAudit" element={<Create />}></Route>
        <Route path="/info" element={<Information />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
