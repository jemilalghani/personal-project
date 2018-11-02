import React from 'react';

const Test = (props) => {
    console.log(props.item);
    return (
        <div ref={`myRef${props.item}`} className={`day-${props.item}`} style={props.jemila}>test</div>
    );
};

export default Test;