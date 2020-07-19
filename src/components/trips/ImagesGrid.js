import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import { classInvisible } from '../../store/actions/tripActions'


class ImagesGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagesArray: this.props.images ? this.props.images : [],
            imageOpenIndex: null,
            imageOpen: "",
            previewAction: "image__preview--close",
            galleryInvisible: ""
        }
        
    }

    handleDisplayOriginalImage = (e,index) => {
        const imageOpen = e.target.src
        this.setState({
            imageOpen,
            imageOpenIndex: index,
            previewAction: "image-preview--open",
            invisible: "invisible"
        })      
        this.props.classInvisible("invisible")

    }


    handleCloseOriginalImage = (e) => {
        e.preventDefault();
        this.setState({
            imageOpen: "",
            previewAction: "image__preview--close",
            invisible: ""
        })
        this.props.classInvisible("")
        this.props.scrollToGallery()
    }
    handlePrevOriginalImage = (e) => {
        e.preventDefault();
        const arrayLength = this.state.imagesArray.length;
        this.setState(prevState => ({
            imageOpenIndex: prevState.imageOpenIndex > 0 ? prevState.imageOpenIndex -1 : arrayLength -1 
        }))
    }

    handleNextOriginalImage = (e) => {
        e.preventDefault();
        const arrayLength = this.state.imagesArray.length;
        this.setState(prevState => ({
            imageOpenIndex: prevState.imageOpenIndex < arrayLength -1 ? prevState.imageOpenIndex +1 : 0
        }))
    }


    render() {

        const images = this.state.imagesArray;
        const displayImages = images.map((image,index) => {
            return <div key = { index } data-src = {image} className ={`gallery__item gallery__item--${index}`} onClick = {(e) => this.handleDisplayOriginalImage(e,index)}>
                        <img src = {image}  className = "gallery__img"></img>
                </div>
        })
        return (<>
                <div className = {`image__preview ${this.state.previewAction}`}>
                    <img src = {images[this.state.imageOpenIndex]}></img>
                    <div className = "slider__buttons">
                        <button className="btn btn--prev" onClick = {this.handlePrevOriginalImage}></button>
                        <button className="btn btn--close" onClick = {this.handleCloseOriginalImage}></button>
                        <button className="btn btn--next" onClick = {this.handleNextOriginalImage}></button>
                    </div>
                </div>
            <div className = {`gallery ${this.state.invisible}`} style ={{width: '100%'}}>
                { displayImages }
            </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        classInvisible: invisible => dispatch(classInvisible(invisible))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesGrid)

