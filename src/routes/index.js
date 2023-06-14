import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/Auth/Login";
import Create from "../pages/Audit/create";

function MyRoutes() {
    return (<BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/createAudit" element={<Create/>}></Route>
        </Routes>
      </BrowserRouter>  );
}

export default MyRoutes;