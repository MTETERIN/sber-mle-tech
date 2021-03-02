// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>{currentYear} © Сбер банк. Больше чем банк. </Col>

                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
