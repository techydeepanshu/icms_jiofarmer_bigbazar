import React, { Fragment, useEffect, useState } from "react";
import './LoginPage.css'
import logo from "../Images/logo.png"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            Username: "",
            password: "",
        }
    }
    handleLogin = () => {
        this.setState({ isSubmit: true })
        if (this.state.Username !== "" && this.state.password !== "") 
        {
            this.props.history.push("/invoice")
        }
    }

    render() {
        return (
            <div className="container-fluid background">
                <div className="row  justify-content-center ">
                    <div className=" margin_top col-sm-6 col-md-6 col-lg-4 ">
                        <img className="image_1 " src={logo} alt="background" />
                        <div className=" custom-card ">
                            <h1 className='text'>Sign in to your account</h1>
                            <h6 className='txt' > Username</h6>
                            <input className='form-control' type=" text"  onChange={(e) => {
                                this.setState({ Username: e.target.value }
                                )
                            }} />
                            {this.state.Username === "" && this.state.isSubmit && <div className="text-danger">please enter  Username </div>}
                            <h6 className='mt-3' > Password</h6>
                            <input className='form-control' name="password" type='password'  onChange={(e) => {
                                this.setState({ password: e.target.value })
                            }} />
                            {this.state.password === "" && this.state.isSubmit && <div className="text-danger">please enter  password </div>}
                            <span>
                                <input className="box" type="checkbox" name="" />Stay signed in for a week
                            </span>
                            <div>
                                <button className="button"   onClick={this.handleLogin} >Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;