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
import PayDetail from './components/income/PayDetail.jsx';
import OrderManage from './components/consumption/OrderManage.jsx';
import HistoricalAccount from './components/income/HistoricalAccount.jsx';
import ClientInfo from './components/member/ClientInfo.jsx'
import OtherPay from './components/income/OtherPay.jsx';
import ProviderManage from './components/buySellStock/ProviderManage.jsx';
import HistoryIncomeDetail from './components/income/HistoryIncomeDetail.jsx';
import HistoryOutcomeDetail from './components/income/HistoryOutcomeDetail.jsx';
import ItemManage from './components/productManage/ItemManage.jsx';
<<<<<<< HEAD
import PartsManage from './components/productManage/PartsManage.jsx';
import CardManage from './components/productManage/CardManage.jsx';
=======
import ProductSearch from './components/buySellStock/ProductSearch.jsx'
<<<<<<< HEAD
import PutInStorage from './components/buySellStock/PutInStorage.jsx'

=======
<<<<<<< HEAD
>>>>>>> b19dc2630840ffb97b6d8bec7b714a2c35805ec6
=======
<<<<<<< HEAD
import PutInStorage from './components/buySellStock/PutInStorage.jsx'

=======
>>>>>>> b19dc2630840ffb97b6d8bec7b714a2c35805ec6
>>>>>>> ff0a7f67f9c181fcb1a8b9ed0bb4488161d6afea
>>>>>>> ff70d09aae9113b87afbdc91b05dcbcb25021164
>>>>>>> 3c6f01562bb2457c7adcbda749b9d02ea28fad42
const routes = < Route path={"/"} components={Page} >
    <Route path={"login"} component={Login} />
    <Route path={"app"} component={App} >
        <Route path={"consumption"} >
            <Route path={"beautyorder"} component={BeautyOrder} />
            <Route path={"fixorder"} component={FixOrder} />
            <Route path={"accountingcenter"} component={CostClose} />
            <Route path={"ordermanage"} component={OrderManage} />
            <Route path={"ordermanage/:orderId"} component={OrderDetail} />
        </Route>
        <Route path={"incomeManage"} >
            <Route path={"incomeSearch"} component={IncomeSearch} />
            <Route path={"incomeSearch/income/:incomeId"} component={IncomeDetail} />
            <Route path={"incomeSearch/pay/:payId"} component = {PayDetail}/>
            <Route path={"historyIncome"} component={AdvancedTable} />
            <Route path={"historyAccount"} component={HistoricalAccount}/>
            <Route path={"historyIncomeDetail"} component={HistoryIncomeDetail} />
            <Route path={"historyOutcomeDetail"} component={HistoryOutcomeDetail} />
            <Route path={"otherPay"} component={OtherPay} />
        </Route>
        <Route path={"member"} >
            <Route path={"memberShip"} component={AdvancedTable} />
            <Route path={"customer"} component={ClientInfo} />
        </Route>
        <Route path={"buySellStock"} >
            <Route path={"productSearch"} component={ProductSearch} />
            <Route path={"buyProduct"} component={PutInStorage} />
            <Route path={"sellProduct"} component={AdvancedTable} />
            <Route path={"productReceipts"} component={AdvancedTable} />
            <Route path={"providerManage"} component={ProviderManage} />
        </Route>
        <Route path={"productManage"} >
            <Route path={"itemManage"} component={ItemManage} />
            <Route path={"partsManage"} component={PartsManage} />
            <Route path={"cardManage"} component={CardManage} />
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