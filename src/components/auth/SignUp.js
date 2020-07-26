import React, { Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const { auth, authError } = this.props
        if( auth.uid ) return <Redirect to ='/home'></Redirect>
        return(
        <div className = "form__container">
            <form onSubmit={this.handleSubmit} autoComplete="off">
                <h1>Sign In</h1>
                <div className = "input__field">
                   <label htmlFor= "firstName">* First Name</label>
                   <input type="text" id="firstName" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                   <label htmlFor= "lastName">* Last Name</label>
                   <input type="text" id="lastName" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                   <label htmlFor= "email">* Email</label>
                   <input type="email" id="email" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field">
                   <label htmlFor= "password">* Password</label>
                   <input type="password" id="password" onChange={this.handleChange} required/> 
                </div>
                <div className = "input__field--login">
                    <button className = "btn">Sign up</button>
                    <div>
                        { authError ? <p> { authError }</p> : null}
                    </div>
                </div>
                <span>(*)required</span>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)