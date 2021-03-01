import React from 'react';
import {Card, CardBody} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const TableWithSearch = (props) => {
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total ml-2">
            Показать с {from} по {to} строку из {size} строк
        </span>
    );

    const paginationOptions = {
        paginationSize: 25,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
            {
                text: 'All',
                value: props.records.length,
            },
        ], // A numeric array is also available. the purpose of above example is custom the text
    };

    if (props.columns.length === 0)
    {
        return null
    }
    return (
        <Card>
            <CardBody>
                <h4 className="header-title">{props.title}</h4>
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={props.records}
                    columns={props.columns}
                    pagination={paginationFactory(paginationOptions)}
                    wrapperClasses="table-responsive"
                />
            </CardBody>
        </Card>
    );
};

export default TableWithSearch