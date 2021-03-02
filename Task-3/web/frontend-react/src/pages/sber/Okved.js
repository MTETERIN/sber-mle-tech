// @flow
import React, {useState} from 'react';
import JsonTemplate from "./MDLPJsonTemplate";

const url = process.env.REACT_APP_BACKEND_URL

const INN = () => {
    const title = "ИНН"
    const [inn, setINN] = useState('');
    const [limit, setLimit] = useState(20);
    let innUrl = `${url}/predict?inn=${inn}`
    const informationToFullfill = [
        {
            name: "ИНН",
            value: inn,
            onChange: (event) => {
                setINN(event.target.value)
            },
            required: true
        },
    ]


    return (
        <JsonTemplate
            title={title}
            url={innUrl}
            table={"Прогноз"}
            informationToFullfill={informationToFullfill}
        />
    );
};

export default INN