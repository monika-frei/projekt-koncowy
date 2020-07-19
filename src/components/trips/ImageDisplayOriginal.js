import React, { Component } from 'react'

class ImageDisplayOriginal extends Component {
    state = {
        imageOpen: "",
        previewAction: "image__preview--close"
        
    }

    handleDisplayOriginalImage = (e) => {
        const imageOpen = e.target.src
        this.setState({
            imageOpen,
            previewAction: "image-preview--open"
        })      

    }

    handleCloseOriginalImage = (e) => {
        this.setState({
            imageOpen: "",
            previewAction: "image__preview--close"
        })
    }
    
    render() {
        return(
            <div className = {`image__preview ${this.state.previewAction}`}>
                <img src = {this.state.imageOpen}></img>
                <button className="btn btn--close" onClick = {this.handleCloseOriginalImage}>Close</button>
            </div>)
    }
}

export default ImageDisplayOriginal