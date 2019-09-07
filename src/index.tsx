import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configure} from 'mobx';
import {Provider} from 'mobx-react'; 
import mainStore from './Store/MainStore'
import dataService from './Data/dataService'
import {startRouter} from "mobx-router"
import routes from "./Config/Views"
import httpService from "./Services/http.service"
import userService from "./Services/user.service" 
import tokenService from "./Services/token.service"
configure({enforceActions: 'always'});
startRouter(routes, mainStore) 
ReactDOM.render(<Provider 
    dataService={dataService} 
    httpService={httpService}
    userService={userService}
    tokenService={tokenService}
    mainStore={mainStore}><App/></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
