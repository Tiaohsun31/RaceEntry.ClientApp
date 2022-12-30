import moment from "moment";

function dateFormat(value) {
    return moment(value).format('YYYY-MM-DD');
};

function numberFormat(value) {
    return new Intl.NumberFormat('en').format(value);
}

function dateTimeFormat(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
}

export { dateFormat, numberFormat, dateTimeFormat }
