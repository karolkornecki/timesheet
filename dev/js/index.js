import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import configureStore from "./configureStore"
import ApplicationRoot from './components/ApplicationRoot'

const store = configureStore();

ReactDOM.render(
    <ApplicationRoot store={store}/>,
    document.getElementById('root')
);
