import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { typeRoles } from '../interfaces/interfaces';
import { Tasks } from '../pages/Tasks';
import { Requests } from '../pages/Requests';
import { Layouts } from '../components/Layout';
import { CreateTask } from '../pages/CreateTask';
import { CreateRequest } from '../pages/CreateRequest';
import { ReviewRequest } from '../pages/ReviewRequest';
import { Reviews } from '../pages/Reviews';

export const useRoutes = (isAuth: boolean, role: typeRoles) => {
  if (!isAuth) {
    return <p>Не авторизован</p>;
  }
  return (
    <Switch>
      <Layouts>
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/task/create" exact component={CreateTask} />
        <Route path="/task/:id" exact component={CreateRequest} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/request/:id" exact component={ReviewRequest} />
        <Route path="/reviews" exact component={Reviews} />
        {/*<Route path="/task/edit/:id" exact component={} />*/}
        {/*<Route path="/crosscheck/create" exact component={} />*/}
        {/*<Route path="/request/edit/:id" exact component={} />*/}
        {/*<Route path="/request/:id" exact component={} />*/}
        {/*<Route path="/disputes" exact component={} />*/}
        {/*<Route path="/dispute/:id" exact component={} />*/}
        {/*<Redirect to="/tasks" />*/}
        <Redirect to="/reviews" />
      </Layouts>
    </Switch>
  );
};
