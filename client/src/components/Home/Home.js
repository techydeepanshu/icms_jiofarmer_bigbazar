import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { authenticate } from '../../store/action/actionAuth'
class Home extends Component {
    render() {
        return (
            <div> 
                {!this.props.isAuthenticated ? <a href = '/auth/login'><button >Click to Login</button></a>: <a href = '/api/logout'><button >Click to logout</button></a>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId
    }
}

export default connect(mapStateToProps)(Home);