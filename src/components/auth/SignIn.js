import React, { Component} from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {

    state = {
        email: '',
        password: ''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const { authError, auth } = this.props
        if( auth.uid ) return <Redirect to ='/'></Redirect>
        return(
        <div className = "form__container">
            <form onSubmit={this.handleSubmit} autoComplete ="off">
                <h1>Log In</h1>
                <div className = "input__field">
                   <label htmlFor= "email">E-mail</label>
                   <input type="email" id="email" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                   <label htmlFor= "password">Password</label>
                   <input type="password" id="password" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field--login">
                   <button className = "btn">Log In</button>
                   <div className="auth__error">
                       { authError ? <p>{authError}</p> : null}
                   </div>
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);