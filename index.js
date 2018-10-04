"use strict";

const exec = require("child_process").exec;
const pdfFiller = require("pdffiller-stream");
const AWS = require("aws-sdk");

// Set the PATH and LD_LIBRARY_PATH environment variables.
process.env["PATH"] =
  process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"] + "/bin";
process.env["LD_LIBRARY_PATH"] = process.env["LAMBDA_TASK_ROOT"] + "/bin";

exports.handler = function(event, context) {
  const sourcePDF = "test.pdf";

  // Data to be filled in the PDF
  const data = {
    "name": "test name",
    "date": "dd/mm/yyyy"
  };

  pdfFiller
    .fillForm(sourcePDF, data)
    .then(outputStream => {
      const Body = outputStream;
      const Bucket = "bucket"; // Create a bucket or use an existing one in S3.
      const Key = "key"; // Name of the generated document
      const ContentType = "application/pdf";

      const uploader = new AWS.S3.ManagedUpload({
        accessKeyId: "accessKeyId", // Get your access key from IAM
        secretAccessKey: "secretAccessKey", // Get your secret access key from IAM
        region: "ap-south-1", // Region of S3
        params: { Bucket, Key, Body, ContentType }
      });

      uploader.promise().then(data => {
        console.log(data);
        context.done();
      });
    })
    .catch(err => {
      console.log(err);
      context.done();
    });
};
