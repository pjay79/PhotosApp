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

`awsmobile user-signin enable`  
`awsmobile push`  
`awsmobile console` (opens the aws console in browser)

This project's source directory is 'app'.

### AWS S3 setup:

#### Bucket policy:

#### CORS configuration:

### Launch

Connect your hardware device via USB to use Camera.

Run on ios:
`react-native run-ios --device "iPhone"`  
Run on android:
`react-native run-android`
