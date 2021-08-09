import React, { Component, Suspense } from "react";
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from "./UI/Spinner/Spinner";
import { checkAuthentication } from "./store/action/actionAuth";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Logout = React.lazy(() => import("./containers/Auth/Logout/Logout"));
const Invoice = React.lazy(() => import("./components/Invoice/Invoice"));
const Queue =React.lazy(()=>import("./components/Queue/Queue"));
const Pos=React.lazy(()=>import("./components/Pos/Pos"));
const SaveInvoiceData = React.lazy(()=>import("./components/SaveInvoiceData/SaveInvoiceData"));
const Inventory=React.lazy(()=>import("./components/Inventory/Inventory"));

class App extends Component {
  componentDidMount() {
    this.props.checkAuthentication();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/invoice" component={Invoice} />
          {/* <Route path="/auth" component={Auth} /> */}
          {/* <Route path="/orders" component={Orders} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/queue" component={Queue}/>
          {/* <Route path="/pos" component={Pos}/> */}
          <Route path="/invoicedata" component={SaveInvoiceData} />
          <Route path="/inventory" component={Inventory}/>
          <Redirect to="/invoice" />
        </Switch>
      );
    }
    return (
      <Suspense fallback = {<Spinner />}>
        <BrowserRouter>
            <div>
            <Layout>
              {routes}
            </Layout>
            </div>
        </BrowserRouter>  
      </Suspense>
    )
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
       checkAuthentication: () => dispatch(checkAuthentication())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
