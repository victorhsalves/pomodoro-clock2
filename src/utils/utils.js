
module.exports = {
    md5: require('md5'),
    shorthash: require('shorthash'),

    getFormattedDate(param) {
        let date = ("0" + param.getDate()).slice(-2);
        let month = ("0" + (param.getMonth() + 1)).slice(-2);
        let year = param.getFullYear();
        let hours = ("0" + param.getHours()).slice(-2);
        let minutes = ("0" + param.getMinutes()).slice(-2);
        let seconds = ("0" + param.getSeconds()).slice(-2);
        var result = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        return result;
    }
}