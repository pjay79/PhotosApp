# PhotosApp

React Native, AWS Amplify, AWS S3. Please note: this is a work still in progress, and many features are not fully developed yet.

## Screenshots

### iOS

## Technology stack:

- aws-amplify-react-native
- prop-types
- react-native-app-intro-slider
- react-native-camera
- react-native-fetch-blob
- react-native-share
- react-native-splash-screen
- react-native-vector-icons
- react-navigation
- rn-fetch-blob

## Installation

### React Native setup:

`brew install node`  
`brew install watchman`  
`npm install -g react-native-cli`

### Project setup:

Clone the repo:
`git clone https://github.com/pjay79/PhotosApp.git`  
Change to the project folder:
`cd PhotosApp`  
Add dependencies:
`npm install` or `yarn`

### Amazon

Sign up to AWS Free Tier:  
https://aws.amazon.com/free/

### AWS Mobile CLI setup

(note: you will be directed to create a new **IAM** user and prompted to enter the **accessKeyId** and **secretAccessKey**, store these in a safe place):

`npm install -g awsmobile-cli`  
`awsmobile configure`  
`awsmobile init` (in the project folder)

![awsmobile2](https://user-images.githubusercontent.com/14052885/41520984-b04a9234-7313-11e8-9d6e-ead22f033725.jpeg)

`awsmobile user-files enable`  
`awsmobile push`  
`awsmobile console` (opens the aws console in browser)

This project's source directory is 'app'.

### AWS S3 setup:

Go to S3 and find your AWS S3 bucket (exact name can be seen in the aws-exports file). Select 'Permissions' and update the Bucket and CORS policy.

#### Bucket policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": [
                "arn:aws:s3:::{your-bucket-name}/*",
                "arn:aws:s3:::{your-bucket-name}"
            ]
        }
    ]
}
```

#### CORS configuration:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
    <ExposeHeader>x-amz-request-id</ExposeHeader>
    <ExposeHeader>x-amz-id-2</ExposeHeader>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

### Launch

Connect your hardware device via USB.

Run on ios:
`react-native run-ios --device "iPhone"`  
Run on android:
`react-native run-android`
