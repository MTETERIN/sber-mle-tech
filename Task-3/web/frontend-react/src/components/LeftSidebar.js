// @flow
import React, { Component } from 'react';

import SimpleBar from 'simplebar-react';

import AppMenu from './AppMenu';


const SideBarContent = ({menuClickHandler }) => {
    return (
        <React.Fragment>


            <AppMenu menuClickHandler={menuClickHandler} />

            <div className="clearfix" />
        </React.Fragment>
    );
};

class LeftSidebar extends Component{

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleOtherClick = this.handleOtherClick.bind(this);
    }

    /**
     * Bind event
     */
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Bind event
     */
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Handle the click anywhere in doc
     */
    handleOtherClick = (e) => {
        if (this.menuNodeRef.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    /**
     * Handle click
     * @param {*} e
     * @param {*} item
     */
    /*:: handleClick: () => void */
    handleClick(e) {
        console.log(e);
    }

    render() {
        const isCondensed = this.props.isCondensed || false;
        const isLight = this.props.isLight || false;
        const hideUserProfile = this.props.hideUserProfile || false;

        return (
            <React.Fragment>
                <div className="left-side-menu" ref={node => (this.menuNodeRef = node)}>

                    {!isCondensed && (
                        <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                            <SideBarContent
                                menuClickHandler={this.handleClick}
                                isLight={isLight}
                                hideUserProfile={hideUserProfile}
                            />
                        </SimpleBar>
                    )}
                    {isCondensed && (
                        <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default LeftSidebar;
