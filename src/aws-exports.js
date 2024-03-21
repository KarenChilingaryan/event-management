import { Amplify } from 'aws-amplify';

Amplify.configure({

    Auth: {
        Cognito: {
            mandatorySignIn: true,
            region: process.env.REACT_APP_AWS_REGION,
            loginWith: { email: true },
            userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
            mfa: { status: 'optional', totpEnabled: false },
            userPoolClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
            userAttributes: { given_name: true, family_name: true }
        }
    },
});
