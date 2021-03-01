import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { allFlattenRoutes as routes } from './index';

import VerticalLayout from '../layouts/Vertical';
import AlertState from "../context/alert/AlertState";
class Routes extends Component {

    render() {
        const Layout = VerticalLayout;
        // rendering the router with layout
        return (
            <AlertState>
                <BrowserRouter>
                    <Layout {...this.props}>
                        <Switch>
                            {routes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}></route.route>
                                    )
                                );
                            })}
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </AlertState>
        );
    }
}

export default Routes
