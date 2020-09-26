import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { uRoutes } from '../../utils/routes';
import { checkAuth } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/rootReducer';
import { Loader } from '../../components/Loader';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuth, user, role } = useSelector((store: RootState) => {
    return {
      isLoading: store.auth.isLoading,
      isAuth: store.auth.isAuth,
      role: store.auth.role,
      user: store.auth.user,
    };
  }, shallowEqual);
  useEffect(() => {
    dispatch(checkAuth());
  }, [user, role]);

  if (isLoading) {
    return <Loader />;
  }
  const routes = uRoutes(isAuth, role);
  return <>{routes}</>;
};
export default App;
