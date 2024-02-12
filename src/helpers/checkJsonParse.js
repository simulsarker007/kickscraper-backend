module.exports.isJsonParseable = (jsonString) => {
    try {
        JSON.parse(jsonString);
        return true;
    } catch (error) {
        return false;
    }
}