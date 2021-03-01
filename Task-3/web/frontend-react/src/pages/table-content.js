export default function prepareDatatableContent(tableName, response) {
    if (!response) {
        return []
    }
    let readyTables = [];
    let fields = []
    if (response.length > 0) {
        Object.keys(response[0]).forEach(field => {
            fields.push({dataField: field, text: field, sort: false})
        })
    }

    let readyTable = {
        "title": `Table ${tableName}`,
        "records": response,
        "columns": fields,
        "searchProps": ""
    }
    readyTables.push(readyTable)
    return readyTables;
}