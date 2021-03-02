// @flow
import React from 'react';
import JsonTemplate from "./MDLPJsonTemplate";

const url = process.env.REACT_APP_BACKEND_URL

const SGTIN = () => {
    const title = "Реестр sgtin"
    const status = 'marked_not_paid'
    const numRows = 1
    const mdlpUrl = `${url}/sgtin?status=${status}&count=${numRows}`
    const informationToFullfill = [
        {
            name: "Статус",
            value: status,
            readonly: true
        },
        {
            name: "Число записей",
            value: numRows,
            readonly: true
        },
    ]


    return (
        <JsonTemplate
            title={title}
            url={mdlpUrl}
            informationToFullfill={informationToFullfill}
        />
    );
};

export default SGTIN