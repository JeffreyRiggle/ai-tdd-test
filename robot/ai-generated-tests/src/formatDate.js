module.exports = function formatDate(date, format) {
    if (!(date instanceof Date)) {
        return 'Invalid Date';
    }

    let formatOptions = {};

    if (format.includes('YYYY')) {
        formatOptions.year = 'numeric';
    }

    if (format.includes('MMMM')) {
        formatOptions.month = 'long';
    } else if (format.includes('MM')) {
        formatOptions.month = 'numeric';
    }

    if (format.includes('DD') || format.includes('D')) {
        formatOptions.day = 'numeric';
    }

    const parts = (new Intl.DateTimeFormat('en-US', formatOptions)).formatToParts(date);
    let retVal = format;

    parts.forEach(p => {
        if (p.type === 'month') {
            let val = p.value < 10 ? '0' + p.value : '' + p.value;

            retVal = retVal.replace(/M+/g, val);
        }

        if (p.type === 'day') {
            retVal = retVal.replace(/D+/g, p.value);
        }

        if (p.type === 'year') {
            retVal = retVal.replace(/Y+/g, p.value);
        }
    });

    return retVal;;
}