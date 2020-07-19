import React, { Component} from 'react';
import { connect } from 'react-redux';
import { formInfo } from './../../store/actions/tripActions'

class FormStepTwo extends Component {

    state = {
        info: this.props.info ? this.props.info : ""
    }


    handleSaveInfo = (e) => {
        let value = e.target.value.toLowerCase();
        this.setState({info: value})
        this.props.formInfo(value)
    }
    render(){
        return(
            <div className = "input__field form__step__two">
                   <label htmlFor= "info">Tell more!</label>
                   <textarea type="text" id="info" value = {this.state.info} onChange={this.handleSaveInfo} /> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        formInfo: info => dispatch(formInfo(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormStepTwo)