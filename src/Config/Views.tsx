import React from 'react'
import HomePage from "../Routes/HomePage/HomePage"
import HistoricPersons from "../Routes/HistoricPersons/HistoricPersons"
import HistoricEvents from "../Routes/HistoricEvents/HistoricEvents"
import {Route} from "mobx-router"


export default {
    homepage:new Route({
        path:'/',
        component: <HomePage/>
    }),
    historicpersons:new Route({
        path:'/persons',
        component: <HistoricPersons/>
    }),
    historicevents:new Route({
        path:'/events',
        component: <HistoricEvents/>
    }),
}