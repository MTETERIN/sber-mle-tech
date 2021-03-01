// @flow
import React from 'react';
import {Col} from "reactstrap";


export default function Input(props){
    const lowerCaseName = props.name.toLowerCase()
    const placeholderText = `Введите ${props.name}`
    return (
        <Col md={3}>
            <label htmlFor={lowerCaseName} className="col-form-label">{props.name}</label>
            <input
                id={lowerCaseName}
                type="number"
                className="form-control"
                placeholder={placeholderText}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                readOnly={props.readonly}
            />
        </Col>
    );
};


