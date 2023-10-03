module.exports = function calculateTotal(values) {
    return values.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
}