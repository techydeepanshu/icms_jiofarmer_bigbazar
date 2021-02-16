import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginPage from '../../UI/LoginPage'
// import { authenticate } from '../../store/action/actionAuth'
class Home extends Component {
    render() {
        return (
            <div > 
             {/* {!this.props.isAuthenticated ? <a href = '/'><button >Click to Login</button></a>: <a href = '/api/logout'>Click to Logout</a>} */}
          

             <LoginPage/>
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