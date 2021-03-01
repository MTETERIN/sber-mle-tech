import React from 'react';

/**
 * Renders the preloader
 */
const Loader = (props) => {
    if (props.isLoaded){
        return  null
    }
    else {
        return (
            <div className="preloader">
                <div className="status">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Loader;
