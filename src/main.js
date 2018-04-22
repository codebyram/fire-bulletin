import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import createReducer from './createReducer';
import initFireBase from './helpers/initFireBase';
import createAppController from './controllers/createAppController';
import {config} from './helpers/firebaseConfig';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

let reducerObj = createReducer();

let store = createStore(reducerObj.reducer,{user: null});
reducerObj.setStore(store);

userReducer(reducerObj);
postReducer(reducerObj);

let myApp = initFireBase(config);

let controller = createAppController(store,myApp);
reducerObj.setController(controller);

ReactDOM.render(
  <Provider store={store}>
    <App controller={controller}/>
  </Provider>,
  document.getElementById('app')
);
