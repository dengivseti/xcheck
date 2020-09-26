import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { typeRoles } from '../interfaces/interfaces';
import { Tasks } from '../pages/Tasks';
import { Requests } from '../pages/Requests';
import { Layouts } from '../components/Layout';
import { CreateTask } from '../pages/CreateTask';
import { CreateRequest } from '../pages/CreateRequest';
import { CreateReview } from '../pages/CreateReview';
import { Reviews } from '../pages/Reviews';
import { CreateDispute } from '../pages/CreateDispute';
import { EditTask } from '../pages/EditTask';
import { EditRequest } from '../pages/EditRequest';
import { EditReview } from '../pages/EditReview';
import { Disputes } from '../pages/Disputes';

export const useRoutes = (isAuth: boolean, role: typeRoles) => {
  if (!isAuth) {
    return <p>Не авторизован</p>;
  }
  return (
    <Switch>
      <Layouts>
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/tasks/create" exact component={CreateTask} />
        <Route path="/task/:id/edit" exact component={EditTask} />
        <Route path="/task/:id" exact component={CreateRequest} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/request/:id" exact component={CreateReview} />
        <Route path="/request/:id/edit" exact component={EditRequest} />
        <Route path="/review/:id/edit" exact component={EditReview} />
        <Route path="/reviews" exact component={Reviews} />
        <Route path="/review/:id" exact component={CreateDispute} />
        <Route path="/disputes" exact component={Disputes} />

        {/*<Route path="/task/edit/:id" exact component={} />*/}
        {/*<Route path="/crosscheck/create" exact component={} />*/}
        {/*<Route path="/request/edit/:id" exact component={} />*/}
        {/*<Route path="/request/:id" exact component={} />*/}
        {/*<Route path="/dispute/:id" exact component={} />*/}
        {/*<Redirect to="/tasks" />*/}
        <Redirect to="/tasks" />
      </Layouts>
    </Switch>
  );
};
