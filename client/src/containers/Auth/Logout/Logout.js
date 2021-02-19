import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {authLogout} from '../../../store/action/actionAuth'

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }
    render() {
        return <Redirect to = '/'/>
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authLogout()),
    }
}

export default connect(null, mapDispatchToProps)(Logout);