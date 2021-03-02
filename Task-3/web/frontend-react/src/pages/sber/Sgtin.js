// @flow
import React, {useState} from 'react';
import JsonTemplate from "./MDLPJsonTemplate";
const url = process.env.REACT_APP_BACKEND_URL

const SGTIN = () => {

    const [sscc, setSSCC] = useState('');
    const [sgtin, setSgtin] = useState('');
    const [gtin, setGtin] = useState('');
    const [batch, setBatch] = useState('');
    const [omsOrderID, setOmsOrderID] = useState('');
    const [status, setStatus] = useState('');
    const [numRows, setNumRows] = useState(1);
    const title = "Структура агрегации"
    const mdlpUrl = `${url}/sgtin?oms_order_id=${omsOrderID}&sgtin=${sgtin}&gtin=${gtin}&batch=${batch}&pack3_id=${sscc}&status=${status}&count=${numRows}`
    const informationToFullfill = [
        {
            name: "SGTIN",
            value: sgtin,
            onChange: (event)=>{setSgtin(event.target.value)},
        },
        {
            name: "SSCC",
            value: sscc,
            onChange: (event)=>{setSSCC(event.target.value)},
        },
        {
            name: "GTIN",
            value: gtin,
            onChange: (event)=>{setGtin(event.target.value)},
        },
        {
            name: "Серия",
            value: batch,
            onChange: (event)=>{setBatch(event.target.value)},
        },
        {
            name: "OMS Order Id",
            value: omsOrderID,
            onChange: (event)=>{setOmsOrderID(event.target.value)},
        },
        {
            name: "Статус",
            value: status,
            onChange: (event)=>{setStatus(event.target.value)},
        },
        {
            name: "Число записей",
            value: numRows,
            onChange: (event)=>{setNumRows(event.target.value)},
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