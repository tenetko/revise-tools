import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {HashRouter} from 'react-router-dom';
import App from './App';
import rootReducer from './store/rootReducer';
import rootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    (<Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
    ),
  document.getElementById('root')
);
