export const formatToCurrency = amount => {
    return (amount).toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&.');
};

export const statusControl = val => {
    let status;
    status = val < 0 ? (val * -1) : val;
    return "$" + status;
};

export const statusColorControl = val => {
    let color;
    color = val < 0 ? "red" : "green";
    return color;
};