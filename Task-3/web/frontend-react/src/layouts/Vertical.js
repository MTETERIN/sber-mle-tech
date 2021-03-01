// @flow
import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const LeftSidebar = React.lazy(() => import('../components/LeftSidebar'));
const Footer = React.lazy(() => import('../components/Footer'));


// loading
const emptyLoading = () => <div></div>;
const loading = () => <div className="text-center"></div>;

class VerticalLayout extends Component{
    constructor(props) {
        super(props);
        this.openLeftMenu = this.openLeftMenu.bind(this);
    }

    /**
     * Opens the left menu - mobile
     */
    openLeftMenu = () => {
        if (document.body) document.body.classList.add('sidebar-enable');
    };


    render() {
        // get the child view which we would like to render
        const children = this.props.children || null;

        const isCondensed = true
        const isLight = false;

        return (
            <div className="app">
                <div className="wrapper">
                    <Suspense fallback={emptyLoading()}>
                        <LeftSidebar
                            {...this.props}
                            isCondensed={isCondensed}
                            isLight={isLight}
                            hideUserProfile={true}
                        />
                    </Suspense>

                    <div className="content-page">
                        <div className="content">

                            <Container fluid>
                                <Suspense fallback={loading()}>{children}</Suspense>
                            </Container>
                        </div>

                        <Suspense fallback={emptyLoading()}>
                            <Footer {...this.props} />
                        </Suspense>
                    </div>
                </div>

            </div>
        );
    }
}

export default VerticalLayout
