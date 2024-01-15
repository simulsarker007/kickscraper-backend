
const monitor = async (req, res) => {
    try {

        const { apiKey } = req.params;
        // Base64 decode the encoded data
        const decodedData = Buffer.from(req?.body, 'base64').toString('utf-8');

        console.log(JSON.parse(decodedData));
        console.log(apiKey)
        res.json({ message: "Successfully DONE" });
    } catch (error) {

        res.status(500).json({ message: 'Internal Server Error', data: false });
    }
};


module.exports = { monitor };
