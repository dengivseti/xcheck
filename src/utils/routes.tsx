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
import { Auth } from '../pages/Auth';

export const uRoutes = (isAuth: boolean, role: typeRoles) => {
  if (!isAuth) {
    return (
      <Switch>
        <Route path="/auth" exact component={Auth} />;
        <Redirect to="/auth" />
      </Switch>
    );
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
        <Redirect to="/tasks" />
      </Layouts>
    </Switch>
  );
};
