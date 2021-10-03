import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { auth } from '../../store/action/actionAuth';
import LoginPage from '../../UI/LoginPage'
import Spinner from '../../UI/Spinner/Spinner';


class Auth extends Component {
    state = {
        username: "",
        password: "",
    }
    submitHandler = (event) => {
        if (this.state.username && this.state.password) {
            event.preventDefault();
            this.props.authHandler(this.state.username, this.state.password);
        } else {
            alert('Please fill all the details.')
        }
    }
    render() {
        // console.log('usernme', this.state.username)
        if (this.props.loading) {
            return < Spinner />
        }
        let redirect = null
        if(this.props.isAuthenticated) {
            redirect = <Redirect to = '/invoice' />
        }
        return (
            <div>
                {redirect}
                <LoginPage
                submitHandler={this.submitHandler}
                setUsername={(val) => this.setState({ username: val })}
                setPassword={(val) => this.setState({ password: val })}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authHandler: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
