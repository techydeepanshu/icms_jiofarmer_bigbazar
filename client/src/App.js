import React, { Component } from 'react'
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Invoice from './components/Invoice/Invoice';
import Home from './components/Home/Home';
import { connect } from 'react-redux';
import { fetchUser } from './store/action/actionAuth';

class App extends Component {

  ws = new WebSocket("ws://localhost:5000");
  
  componentDidMount() {
    // this.props.fetchUser()
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    this.ws.onmessage = (evt) => {
      //  console.log(JSO)
      // listen to data sent from the websocket server
      if (evt.data) {
        const message = JSON.parse(evt.data);
        //  this.setState({ dataFromServer: message });
        console.log(message);
      } else {
        console.log("No data received");
      }
    };
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
