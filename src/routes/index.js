import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/Auth/Login";

function MyRoutes() {
    return (<BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>  );
}

export default MyRoutes;