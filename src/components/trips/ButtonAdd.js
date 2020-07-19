import React from 'react';

function ButtonAdd(props) {
    return (
        <div className = "input__field btn--action">
            <button className = "btn" onClick = {props.handlePrevButton}>Prev</button>
            <button className = "btn" onClick = {props.handleSubmit}>Add</button>
        </div>
    )
}

export default ButtonAdd