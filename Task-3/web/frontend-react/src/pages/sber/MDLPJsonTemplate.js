import React, {useState, useContext, useEffect} from 'react';
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import {handleError, setTitle, submitHandler} from "../utils";
import {Col, Row} from "reactstrap";
import Input from "../../components/Input";
import Duration from "../../components/Duration";
import Loader from "../../components/Loader";
import Table from "../../components/Table";
import prepareDatatableContent from "../table-content";
import AlertContext from "../../context/alert/alertContext";

const JsonTemplate = (props) => {
    alert = useContext(AlertContext)
    const url = props.url
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState('');
    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        setTitle(props.title)
    }, [props.title])

    useEffect(() => {
        handleError(alert, error)
    }, [error])

    useEffect(() => {
        if (!isLoaded) {
            fetch(url)
                .then(res => res.json())
                .then((result) => {
                        setIsLoaded(true);
                        setError(result.error_desc)
                        setDataTable(prepareDatatableContent(props.table, result));
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    })
        }
    }, [isLoaded, url])


    return (
        <div>
            <PageTitle title={props.title}/>
            <Alert/>
            <form onSubmit={event => submitHandler(event, setIsLoaded)}>
                <Row>
                    {props.informationToFullfill.map(item => (
                        <Input key={item} {...item}/>
                    ))}
                </Row>
                <Row>
                    <Col md={3} className="form-group  col-md-4 input-group py-2">
                        <button type="submit" className="btn btn-primary btn-rounded">Отправить запрос</button>
                    </Col>
                </Row>
            </form>
            <Loader isLoaded={isLoaded}/>
            {dataTable.map(item => (
                <Table {...item}/>
            ))}
        </div>
    );
};

export default JsonTemplate