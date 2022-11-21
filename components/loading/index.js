import React from 'react'

export const Loader = (props) => {
    return (
        <div className="data-loader-container">
            <div className="flex-center flex-column" style={{ paddingRight: props.right }}>
                <div className="loader"></div>
            </div>
        </div>
    );
};
