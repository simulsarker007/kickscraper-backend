const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const userController = require('../controllers/userController');
const applicationController = require("../controllers/applicationController");
const apiKeyController = require("../controllers/apiKeyController");
const dashboardController = require("../controllers/dashboardController");
const uploaderFn = require('../middleware/uploader');

const router = express.Router();

router.use(authenticateJWT);


//user api
router.get('/protected', userController.protectedRoute);
router.get('/', userController.getUser);
router.post('/update', uploaderFn('avatars', ['image/jpeg', 'image/png', 'image/gif']).single('avatar'), userController.updateUser);



//dashboard api
router.get('/requests/last-24-hours/:appId', dashboardController.getRequestsLast24Hours);
router.get('/requests/last-7-days/:appId', dashboardController.getRequestsLast7Days);
router.get('/requests/last-30-days/:appId', dashboardController.getRequestsLast30Days);
router.get('/requests/last-12-months/:appId', dashboardController.getRequestsLast12Months);


//application api
router.post('/app/create', applicationController.createApp);
router.post('/app/delete/:appId', applicationController.deleteApp);
router.post('/app/update/:appId', applicationController.updateApp)
router.get('/app/by_user', applicationController.getAppByUser)
router.get('/app/single/:appId', applicationController.getCurrentApp)


//application api key api
router.post('/api/create/:appId', apiKeyController.createApi)
router.post('/api/update/:appId/:apiKeyId', apiKeyController.updateApiKey)
router.get('/api/by_app/:appId', apiKeyController.getApiByApp)
router.get('/api/single/:appId/:apiKeyId', apiKeyController.getApiKey);
router.delete('/api/delete/:apiKeyId', apiKeyController.deleteApiKey);

module.exports = router;
