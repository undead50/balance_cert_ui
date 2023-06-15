import { Route,Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
function Auth() {
    return (
        <Routes>
            <Route path='/d/' element={<Dashboard/>}></Route>
        </Routes>
      );
}

export default Auth;