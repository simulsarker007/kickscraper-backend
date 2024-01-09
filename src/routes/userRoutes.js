const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const userController = require('../controllers/userController');
const applicationController = require("../controllers/applicationController");
const apiKeyController = require("../controllers/apiKeyController");

const router = express.Router();

router.use(authenticateJWT);


//user profile
router.get('/protected', userController.protectedRoute);
router.get('/', userController.getUser);
router.post('/update', userController.updateUser);

//user application
router.post('/app-create', applicationController.createApp);
router.get('/user-app', applicationController.getAppByUser);
router.get('/user-app/:appId', applicationController.getCurrentApp);

//api_keys
router.post('/api-create/:appId', apiKeyController.createApi);
router.get('/apis/:appId', apiKeyController.getApiByApp);
router.get('/api/:appId/:apiKeyId', apiKeyController.getApiKey);
router.post('/api-update/:appId/:apiKeyId', apiKeyController.updateApiKey);

module.exports = router;
