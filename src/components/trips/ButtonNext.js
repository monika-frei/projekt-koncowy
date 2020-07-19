import React from 'react';
import { parseWithOptions } from 'date-fns/fp';

function ButtonNext(props) {
    return (
        <div className = "input__field btn--action">
            <button className = "btn" onClick = {props.handleNextButton}>Next</button>
        </div>
    )
}

export default ButtonNext