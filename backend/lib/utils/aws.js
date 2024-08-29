"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFileFromS3 = deleteFileFromS3;
exports.uploadFileToS3 = uploadFileToS3;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Configuración de las credenciales de AWS S3
_awsSdk["default"].config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
var s3 = new _awsSdk["default"].S3();

/**
 * Uploads a file to an AWS S3 bucket.
 * 
 * @param {Buffer} fileBuffer - The buffer containing the file data.
 * @param {string} fileName - The name of the file to be uploaded.
 * @param {string} bucketName - The name of the S3 bucket where the file will be uploaded.
 * @param {string} folderPath - The folder path in the bucket where the file will be stored.
 * @returns {Promise<AWS.S3.ManagedUpload.SendData>} - A promise that resolves to the result of the upload operation.
 */
function uploadFileToS3(fileBuffer, fileName, bucketName, folderPath) {
  var fullFilePath = "".concat(folderPath, "/").concat(fileName); // Build the full file path with the folder and file name
  var params = {
    Bucket: bucketName,
    Key: fullFilePath,
    Body: fileBuffer
    // ACL: 'public-read' // Uncomment if you need the file to be publicly readable
  };
  return s3.upload(params).promise();
}

/**
 * Deletes a file from an AWS S3 bucket.
 * 
 * @param {string} fileName - The name of the file to be deleted.
 * @param {string} bucketName - The name of the S3 bucket where the file is stored.
 * @param {string} folderPath - The folder path in the bucket where the file is stored.
 * @returns {Promise<AWS.S3.DeleteObjectOutput>} - A promise that resolves to the result of the delete operation.
 */
function deleteFileFromS3(fileName, bucketName, folderPath) {
  var fullFilePath = "".concat(folderPath, "/").concat(fileName);
  var params = {
    Bucket: bucketName,
    Key: fullFilePath
  };
  return s3.deleteObject(params).promise();
}