import React, { Component } from 'react'
import firebase from '../../config/fb.config'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { selectFiles } from '../../store/actions/tripActions'

class UploadImages extends Component {
    state = {
        progress: 0,
        isUploading: null
    }

    // handleUploadImages = (files) => {

    //     for(let i= 0; i < files.length; i++ ) {
    //         const uploadTask = firebase.storage().ref(`images/${files.item(i).name}`)
    //         .put(files.item(i));

    //         uploadTask.on("state_changed",
    //         (snapshot) => {
    //             const isUploading = true;
    //             this.setState({ isUploading });
    //             const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100);
    //             this.setState({ progress });

    //         },
            
    //         () => {
    //             firebase.storage().ref("images")
    //             .child(files.item(i).name)
    //             .getDownloadURL()
    //             .then(url => {
    //                 const isUploading = false;
    //                 this.setState({ isUploading });
    //                 const image = {
    //                     url: url,
    //                     added: new Date()
    //                 }
    //                 firebase.firestore().collection("images").add(image)
    //                 .then(res => {
    //                     console.log('success')
    //                 })
    //             })
    //         })
    //     }
    // }

    handleUploadImages = (files) => {
        this.props.selectFiles(files);
    }

    render() {
        return(
        <div className = "adding_images--wrapper">
            {/* {this.state.isUploading ? (
                <Progress percentage = {this.state.progress} />
            ): ""} */}
            <Dropzone>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}
                                onDrop = {files => this.handleUploadImages(files)}
                                onChange = {e => this.handleUploadImages(e.target.files) } />
                            <div className = "custom__file">
                                <input id="custom__file"></input>
                                <label htmlFor = "custom__file">Drag and drop or choose a files</label>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
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
        selectFiles: (files) => dispatch(selectFiles(files))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadImages)