export function convertDate(dateString = new Date()) {
    dateString = new Date(dateString)
    const month = dateString.getMonth() + 1;
    const date = dateString.getDate();
    return `${date < 10 ? "0" + date : date}-${month < 10 ? "0" + month : month}-${dateString.getFullYear()}`;
}

export function convertDateTime(dateString = new Date()) {
    dateString = new Date(dateString)
    const hour = dateString.getHours();
    const min = dateString.getMinutes();
    const date = dateString.getDate();
    const month = dateString.getMonth() + 1;
    return `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min} ${date < 10 ? "0" + date : date}-${month < 10 ? "0" + month : month}-${dateString.getFullYear()}`;
}

export function isInputDateBeforeToday(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const today = new Date();
    return inputDate < today;
}