const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const userController = require('../controllers/userController');
const applicationController = require("../controllers/applicationController");
const apiKeyController = require("../controllers/apiKeyController");
const uploaderFn = require('../middleware/uploader');

const router = express.Router();

router.use(authenticateJWT);


//user api
router.get('/protected', userController.protectedRoute);
router.get('/', userController.getUser);
router.post('/update', uploaderFn('avatars', ['image/jpeg', 'image/png', 'image/gif']).single('avatar'), userController.updateUser);



//application api
router.post('/app/create', applicationController.createApp);
router.post('/app/update/:appId', applicationController.updateApp)
router.get('/app/by_user', applicationController.getAppByUser)
router.get('/app/single/:appId', applicationController.getCurrentApp)



//application api key api
router.post('/api/create/:appId', apiKeyController.createApi)
router.post('/api/update/:appId/:apiKeyId', apiKeyController.updateApiKey)
router.get('/api/by_app/:appId', apiKeyController.getApiKey)
router.get('/api/single/:appId/:apiKeyId', apiKeyController.getApiKey);

module.exports = router;
