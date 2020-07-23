import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { formFiles } from '../../store/actions/tripActions'

class UploadImages extends Component {
    state = {
        files: this.props.files ? [...this.props.files] : [],
        filesUrl: this.props.filesUrl ? [...this.props.filesUrl] : []
    }

    handleUploadImages = (files) => {
        const images = [...files];
        const filesUrl = images.map(file => {
            return URL.createObjectURL(file)
        })
        this.setState({filesUrl,files})
        this.props.formFiles(files,filesUrl);
    }

    render() {
        console.log(this.props.filesUrl)
        const files = this.state.filesUrl;
        const images = files.map((file, index) => {
                return (
                    <li key = {index}>
                        <img src= {file}></img>
                    </li>
                )
            })
        
        
        return(
        <div className = "adding_images--wrapper">
            <Dropzone>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}
                                onDrop = {files => this.handleUploadImages(files)}
                                onChange = {e => this.handleUploadImages(e.target.files) }
                                maxSize = {20000000}
                                multiple = {true} />
                            <div className = "custom__file">
                                <label htmlFor = "custom__file">Show your pictures!</label>
                                <input id="custom__file"></input>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            <ul className = "images__upload__preview">
                { images }
            </ul>
        </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        formFiles: (files, filesUrl) => dispatch(formFiles(files, filesUrl))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadImages)