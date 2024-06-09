const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage }= require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder:"image_blog",
        format: async () => "png",
        public_id: (req, file) =>file.filename,
    },
});

//parser ==> middleware to call on Route
const parser = multer({storage: storage});

module.exports = parser;