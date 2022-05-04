const fs = require('fs')
var AWS = require('aws-sdk');

const bucket_name="999autoimagebucket"
// const region = "ap-southeast-1"
// const bucket_accessKeyId ="AKIAXREWRRAP7KEQJI6U"
// const bucket_secretAccessKey="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"

AWS.config.update({
  accessKeyId: "AKIAXREWRRAP7KEQJI6U",
  secretAccessKey: "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",
  // region: "ap-southeast-1"
});

var s3 = new AWS.S3();

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    console.log(file);
    const uploadParams = {
      Bucket: bucket_name,
      Body: fileStream,
      Key: file.originalname
    }
  
    return s3.upload(uploadParams).promise()
  }


exports.uploadFile = uploadFile


function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket_name
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream