import React from 'react';
import { useRoutes } from '../../utils/routes';
import { typeRoles } from '../../interfaces/interfaces';

const App = () => {
  const isAuthenticated = true;
  const role: typeRoles = 'student';

  const routes = useRoutes(isAuthenticated, role);

  return <>{routes}</>;
};
export default App;
