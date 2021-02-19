import React, { Fragment, useEffect, useState } from "react";
import './LoginPage.css'
import logo from "../Images/logo.png"

class LoginPage extends React.Component {
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
                                this.props.setUsername( e.target.value)
                            }} />
                            <h6 className='mt-3' > Password</h6>
                            <input className='form-control' name="password" type='password'  onChange={(e) => {
                                this.props.setPassword(e.target.value)
                            }} />
                            <div>
                                <button className="button"   onClick={this.props.submitHandler} >Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;