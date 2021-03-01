// @flow
import React from 'react';
import AppMenu from './AppMenu';
import { Collapse } from 'reactstrap';


const Navbar = (props) => {
    return (
        <React.Fragment>
            <div className="topnav">
                <div className="container-fluid">
                    <nav className="navbar navbar-dark navbar-expand-lg topnav-menu">
                        <Collapse isOpen={props.isMenuOpened} className="navbar-collapse" id="topnav-menu-content">
                            <AppMenu/>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
