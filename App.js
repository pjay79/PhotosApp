import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './app/aws-exports';
import MainNavigator from './app/routes/MainNavigator';

Amplify.configure(awsConfig);

const App = () => <MainNavigator />;

export default App;
