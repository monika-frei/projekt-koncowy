import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'


class ImagesGrid extends Component {

    state = {
        imagesArray: this.props.images ? this.props.images : []
    }

    render() {

        const images = this.state.imagesArray;
        const displayImages = images.map((image,index) => {
            return <div key = { index } data-src = {image} className ={`gallery__item gallery__item--${index}`} onClick = {(e) => this.props.handleDisplayOriginalImage(e,index)}>
                        <img src = {image}  className = "gallery__img"></img>
                </div>
        })
        return (<div className = {`gallery ${this.props.invisible}`} style ={{width: '100%'}}>
                { displayImages }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const classInvisible = state.classInvisible.classInvisible;
    return {
        classInvisible
    }
}

export default connect(mapStateToProps)(ImagesGrid)

