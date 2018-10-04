# serverless-pdf-filler
A serverless lamblda function to fill a fillable pdf with json data and store the resulting pdf on S3.

## Pre-requisites
- AWS account with [AWS-CLI](https://aws.amazon.com/cli/) configured and access to S3
- [Serverless](https://serverless.com) framework installed
- Fillable PDF  (To create a fillable pdf, try [pdfescape](https://www.pdfescape.com/'))

## How to use
1. Clone the repo and install `pdffiller-stream`
```
    npm install --save pdffiller-stream
```

2. Add a source fillable pdf in the root directory of the project and change the `sourcePDF` value to that pdf name.
```
    const sourcePDF = "test.pdf";
```

3. Add the required data to be filled in the pdf. 
```
  const data = {
    "name": "test name",
    "date": "dd/mm/yyyy"
  };

```
In most cases, this data will be send in the `event` object while triggering the lambda. 

4. Update the S3 bucket name and the key of new pdf to be generated. 
```
      const Bucket = "bucket"; // Create a bucket or use an existing one in S3.
      const Key = "key"; // Name of the generated document
```

5. Update the aws credentials. Access key and access secret key can be taken from the IAM console. 

### Test locally
```
serverless invoke local —f pdftk
```

### Deploy
```
serveless deploy
```




