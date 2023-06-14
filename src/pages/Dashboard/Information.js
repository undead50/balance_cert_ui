import { Outlet } from 'react-router-dom';
import AdminLayout from '../../containers/AdminLayout';

function Information() {
  const content = 'dashboard';
  return (
    <>
      <h1>asdfsd</h1>
      <Outlet />
    </>
  );
}

export default Information;
