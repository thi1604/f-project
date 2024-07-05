const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config(); 

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET
});

module.exports.uploadtoCloud = (req, res, next)=>{
  if(req.file){
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    }
    const uploadtoCloud = async (buffer)=> {
      const result = await streamUpload(buffer);
      req.body[req.file.fieldname] = result.url;
      next(); //Luu y khi dung next
    };
    uploadtoCloud(req.file.buffer);
  }
  else
    next();
}