'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './components/Login.jsx';
import BeautyOrder from './components/consumption/BeautyOrder.jsx'
import AdvancedTable from './components/tables/AdvancedTables.jsx';
import CostClose from './components/consumption/CostClose.jsx';
import IncomeSearch from './components/income/IncomeSearch.jsx';
import Page from './components/Page.jsx';
import FixOrder from './components/consumption/FixOrder.jsx';
import OrderDetail from './components/consumption/OrderDetail.jsx';
import IncomeDetail from './components/income/IncomeDetail.jsx';
import OrderManage from './components/consumption/OrderManage.jsx';
import HistoryIncomeDetail from './components/income/HistoryIncomeDetail.jsx';
import HistoryOutcomeDetail from './components/income/HistoryOutcomeDetail.jsx';
import ItemManage from './components/productManage/ItemManage.jsx';
const routes = < Route path={"/"} components={Page} >
    <Route path={"login"} component={Login} />
    <Route path={"app"} component={App} >
        <Route path={"consumption"} >
            <Route path={"beautyorder"} component={BeautyOrder} />
            <Route path={"fixorder"} component={FixOrder} />
            <Route path={"accountingcenter"} component={CostClose} />
            <Route path={"ordermanage"} component={OrderDetail} />
            <Route path={"ordermanage/:orderId"} component={OrderDetail} />
        </Route>
        <Route path={"incomeManage"} >
            <Route path={"incomeSearch"} component={IncomeSearch} />
            <Route path={"incomeSearch/:incomeId"} component={IncomeDetail} />
            <Route path={"historyIncome"} component={AdvancedTable} />
            <Route path={"historyIncomeDetail"} component={HistoryIncomeDetail} />
            <Route path={"historyOutcomeDetail"} component={HistoryOutcomeDetail} />
            <Route path={"otherPay"} component={AdvancedTable} />
        </Route>
        <Route path={"member"} >
            <Route path={"memberShip"} component={AdvancedTable} />
            <Route path={"customer"} component={AdvancedTable} />
        </Route>
        <Route path={"buySellStock"} >
            <Route path={"productSearch"} component={AdvancedTable} />
            <Route path={"buyProduct"} component={AdvancedTable} />
            <Route path={"sellProduct"} component={AdvancedTable} />
            <Route path={"productReceipts"} component={AdvancedTable} />
            <Route path={"providerManage"} component={AdvancedTable} />
        </Route>
        <Route path={"productManage"} >
            <Route path={"itemManage"} component={ItemManage} />
            <Route path={"partsManage"} component={AdvancedTable} />
            <Route path={"cardManage"} component={AdvancedTable} />
        </Route>
        <Route path={"dataTable"} >
            <Route path={"businessSummary"} component={AdvancedTable} />
        </Route>
        <Route path={"systemSet"} >
            <Route path={"staffManage"} component={AdvancedTable} />
            <Route path={"accountManage"} component={AdvancedTable} />
        </Route>
        <Route path="/dashboard/index" component={AdvancedTable} />
    </Route>
</Route>

ReactDom.render((
    <Router history={hashHistory} >
        {routes}
    </Router>),
    document.getElementById('app')
);