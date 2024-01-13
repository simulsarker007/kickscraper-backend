const fs = require('fs').promises;

async function deleteFile(filePath) {
    try {
        // Delete the file
        await fs.unlink(filePath);
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
    }
}

module.exports = deleteFile