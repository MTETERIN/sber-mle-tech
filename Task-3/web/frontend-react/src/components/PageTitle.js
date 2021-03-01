// @flow
import React from 'react';
import {Row} from 'reactstrap';

/**
 * PageTitle
 */
const PageTitle = (props) => {
    return (
        <Row>
            <h4 className="page-title">{props.title}</h4>
        </Row>
    );
};

export default PageTitle;
