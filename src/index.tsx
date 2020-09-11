import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './containers/App/App';
import { Requests } from './pages/Requests';

const categories = ['Basic Scope', 'Extra Scope', 'Fines'];

const TagHandler = (tags) => {
  console.log(tags);
};

const ItemsHandler = (items) => {
  console.log(items);
};

ReactDOM.render(
  <>
    <Provider store={store}>
      {/*<TagCategoriesOrder categories={categories} onTag={TagHandler} />*/}
      {/*<FormCheckEdit categories={categories} onItems={ItemsHandler} />*/}
      {/*<CrossCheck />*/}
      <Requests />
    </Provider>
  </>,
  document.getElementById('root')
);
