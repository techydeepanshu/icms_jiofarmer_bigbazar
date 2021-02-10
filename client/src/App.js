import React, { Component } from 'react'
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Invoice from './components/Invoice/Invoice';
import Home from './components/Home/Home';
import { connect } from 'react-redux';
import { fetchUser } from './store/action/actionAuth';

class App extends Component {

  
  
  componentDidMount() {
    // this.props.fetchUser()
    
  }
    render() {
      return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/invoice" component={Invoice} />
              <Route path="/" exact component={Home} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </BrowserRouter>
      );
    }
}
// const mapStateToProps = state => {
//   return {

//   }
// }
const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}
export default connect(null, mapDispatchToProps)(App);
