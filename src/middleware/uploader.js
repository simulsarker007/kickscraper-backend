const multer = require('multer');
const path = require('path');
const { resourcesPath } = require('../constants');
const fs = require('fs').promises;

const uploaderFn = (folderName, fileTypes) => {

    // Multer storage configuration
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            // Define the path relative to the 'src' directory
            const folder_path = `${resourcesPath}/${folderName}`;

            // Ensure the directory exists before attempting to save the file
            await fs.mkdir(folder_path, { recursive: true });

            cb(null, `${folder_path}`); // Specify the directory where you want to store the uploaded files

        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
        },

    });

    // Multer upload configuration
    const uploader = multer({
        storage,
        fileFilter: (req, file, cb) => {

            if (fileTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                req.file = {
                    error: `Invalid file type. Only ${fileTypes?.toString().replace(new RegExp(',', 'g'), ', ')} are allowed.`
                };
                cb(null, false);
                return undefined;
            }
        },

    });



    return uploader;

}

module.exports = uploaderFn;
