# PhotosApp

React Native, AWS Amplify, AWS S3. Plus Mobile Analytics with Pinpoint. Please note: this is a work still in progress, and many features are not fully developed yet.

<img width="1348" alt="photos-screenflow" src="https://user-images.githubusercontent.com/14052885/42986266-3f1cee3e-8c38-11e8-847f-86d9c7aff1f3.png">

## Screenshots

### iOS

![img_2410](https://user-images.githubusercontent.com/14052885/42982756-2fab57e0-8c26-11e8-8e7e-e750ed2d0d0d.PNG)
![img_2439](https://user-images.githubusercontent.com/14052885/42982767-32693f60-8c26-11e8-82f7-09196775968e.PNG)
![img_2411](https://user-images.githubusercontent.com/14052885/42982757-2ff3ace8-8c26-11e8-84a8-bd071cd96100.PNG)
![img_2413](https://user-images.githubusercontent.com/14052885/42982758-302d0754-8c26-11e8-83c5-dc580f1e8a35.PNG)
![img_2419](https://user-images.githubusercontent.com/14052885/42982762-310ed9ea-8c26-11e8-934d-ea7d9c84de2f.PNG)
![img_2415](https://user-images.githubusercontent.com/14052885/42982759-3076d05a-8c26-11e8-9124-4ae48fd23ca6.PNG)
![img_2437](https://user-images.githubusercontent.com/14052885/42982764-3160392a-8c26-11e8-9681-50b319c626f2.PNG)
![img_2441](https://user-images.githubusercontent.com/14052885/42983720-8b864ec6-8c2b-11e8-9f5f-5bb456b8d4a8.PNG)
![img_2445](https://user-images.githubusercontent.com/14052885/42995128-65b4a3aa-8c53-11e8-9d38-62f9a0cf48a3.PNG)
![img_2438](https://user-images.githubusercontent.com/14052885/42982766-31e0a286-8c26-11e8-8ba7-a66afdb30ceb.PNG)

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

This project is running with Node version 10.6.0.

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

### AWS Analytics:

Select 'Mobile Analytics' in the AWS Services section. Check the Region Table to make sure Pinpoint is available in your country.

https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

### Launch

Connect your hardware device via USB.

Run on ios:
`react-native run-ios --device "iPhone"`  
Run on android:
`react-native run-android`
