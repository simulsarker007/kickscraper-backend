const { isJsonParseable } = require("../helpers/checkJsonParse");
const ApiKey = require("../models/api_key");
const Application = require("../models/application");
const Request = require("../models/request");

const axios = require('axios');

async function getCurrentLocation() {
    try {
        const response = await axios.get('http://ip-api.com/json');
        const { city, regionName, country } = response.data;
        return {
            city, regionName, country
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
}




const monitor = async (req, res) => {
    try {

        const { apiKey } = req.params;

        // Base64 decode the encoded data

        const decodedData = Buffer.from(req?.body, 'base64').toString('utf-8');

        const api_Key = await ApiKey.findOne({ key: apiKey });

        if (!api_Key) {
            return res.status(404).json({ message: 'not found!', data: false });
        }

        if (!isJsonParseable(decodedData)) {
            return res.status(500).json({ message: 'invalid data', data: false });
        }


        const application = Application.findOne({ _id: api_Key?.app_id });

        if (data?.currentPage?.includes(domain)) {
            application.verified = true;
        }


        application.save();


        const data = JSON.parse(decodedData);


        // Usage
        const location = await getCurrentLocation()
            .then(location => {
                if (location) {
                    return location
                } else {
                    return false
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });

        // console.log(req)

        const createRequest = new Request({
            api_key: api_Key?._id,
            application: api_Key?.app_id,
            user_id: api_Key?.user_id,
            visit_id: data?.visitorID,
            incognito_mode: data?.incognito_mode,
            bot: data?.detectionResult?.bot,
            kicked_bot: data?.kicked_bot,
            botKind: data?.botKind,
            collectionTime: data?.collectionTime,
            android: data?.collectedData?.android?.value,
            browserKind: data?.debugData?.browserKind,
            browserEngineKind: data?.debugData?.browserEngineKind,
            userAgent: data?.collectedData?.userAgent?.value,
            appVersion: data?.collectedData?.appVersion?.value,
            traffic_source: data?.referrer,
            current_page: data?.currentPage,
            country: location?.country,
            city: location?.city,
            platform: data?.platform,
            device: data?.deviceType,
            captcha_status: data?.captcha_status,
            request: decodedData,
        });


        await createRequest?.save();


        return res.status(200).json({ message: 'ok' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error', data: false });
    }
};


module.exports = { monitor };
