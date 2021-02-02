import React, { Component } from 'react'
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Survey from './components/Survey/Survey';
import Home from './components/Home/Home';
import { connect } from 'react-redux';
import { fetchUser } from './store/action/actionAuth';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
    render() {
      return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/survey" component={Survey} />
              <Route path="/" exact component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      
      )
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
