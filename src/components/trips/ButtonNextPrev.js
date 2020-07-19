import React from 'react';

function ButtonNextPrev(props) {
    return (
        <div className = "input__field btn--action">
            <button className = "btn" onClick = {props.handlePrevButton}>Prev</button>
            <button className = "btn" onClick = {props.handleNextButton}>Next</button>
        </div>
    )
}

export default ButtonNextPrev