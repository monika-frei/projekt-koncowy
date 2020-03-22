import React, { Component} from 'react';
import { connect } from 'react-redux'
import { createTrip } from '../../store/actions/tripActions'
import { Redirect } from 'react-router-dom'

class UploadTripImage extends Component {
    render() {
        return <form>
            <input type="file"></input>
            <button>Upload</button>
        </form>

    }
}

export default UploadTripImage;