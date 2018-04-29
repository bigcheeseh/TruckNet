import { createStore, applyMiddleware } from "redux";

import getRootReducer from "./reducers";
import logger from 'redux-logger'
// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default function getStore() {
    const store = createStore(
        getRootReducer(),
        //undefined
        //applyMiddleware(thunk)
        //applyMiddleware(logger),
        applyMiddleware(sagaMiddleware)
    );

    // then run the saga
    sagaMiddleware.run(mySaga)

    return store;
}