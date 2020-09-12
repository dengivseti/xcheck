import React from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from '../../utils/routes';
import { typeRoles } from '../../interfaces/interfaces';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = true;
  const role: typeRoles = 'student';

  const routes = useRoutes(isAuthenticated, role);

  return <>{routes}</>;
};
export default App;
