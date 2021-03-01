// @flow
import React, {useState} from 'react';
import JsonTemplate from "./MDLPJsonTemplate";

const url = process.env.REACT_APP_BACKEND_URL

const Pays = () => {
    const title = "Платежи"
    const [innSender, setInnSender] = useState('');
    const [innReceiver, setinnReceiver] = useState('');
    const [limit, setLimit] = useState(20);
    let innUrl = `${url}/pays?inns=${innSender}&innr=${innReceiver}&limit=${limit}`
    const informationToFullfill = [
        {
            name: "ИНН отправителя",
            value: innSender,
            onChange: (event) => {
                setInnSender(event.target.value)
            },
        },
        {
            name: "ИНН получателя",
            value: innReceiver,
            onChange: (event) => {
                setinnReceiver(event.target.value)
            },
        },
        {
            name: "Количество строк",
            value: limit,
            onChange: (event) => {
                setLimit(event.target.value)
            },
            required: true
        },
    ]


    return (
        <JsonTemplate
            title={title}
            url={innUrl}
            table={"Платежи"}
            informationToFullfill={informationToFullfill}
        />
    );
};

export default Pays