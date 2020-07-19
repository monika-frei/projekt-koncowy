import React from 'react';

function ButtonUpdate(props) {
    return (
        <div className = "input__field btn--action">
            <button className = "btn" onClick = {props.handlePrevButton}>Prev</button>
            <button className = "btn" onClick = {props.handleUpdate}>Update</button>
        </div>
    )
}

export default ButtonUpdate