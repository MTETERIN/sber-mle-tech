export function handleError(alert, message) {
    if (message) {
            alert.show(message, 'danger')
        } else {
            alert.hide()
        }
}


export function setTitle(title) {
    document.title = title
}


export function submitHandler(event, setLoader) {
        event.preventDefault()
        setLoader(false);
}