import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { typeRoles } from '../interfaces/interfaces';
import { Tasks } from '../pages/Tasks';
import { Requests } from '../pages/Requests';
import { Layouts } from '../components/Layout';
import { CreateTask } from '../pages/CreateTask';

export const useRoutes = (isAuth: boolean, role: typeRoles) => {
  if (!isAuth) {
    return <p>Не авторизован</p>;
  }
  return (
    <Switch>
      <Layouts>
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/task/create" exact component={CreateTask} />
        {/*<Route path="/reviews" exact component={} />*/}
        {/*<Route path="/review" exact component={} />*/}
        {/*<Route path="/review/:id" exact component={} />*/}
        {/*<Route path="/task/edit/:id" exact component={} />*/}
        {/*<Route path="/crosscheck/create" exact component={} />*/}
        {/*<Route path="/request/create/" exact component={} />*/}
        {/*<Route path="/request/edit/:id" exact component={} />*/}
        {/*<Route path="/request/:id" exact component={} />*/}
        {/*<Route path="/disputes" exact component={} />*/}
        {/*<Route path="/dispute/:id" exact component={} />*/}
        <Redirect to="/tasks" />
      </Layouts>
    </Switch>
  );
};
