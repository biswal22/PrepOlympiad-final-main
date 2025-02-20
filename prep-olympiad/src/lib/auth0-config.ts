export const auth0Config = {
  authorizationParams: {
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
    audience: process.env.AUTH0_AUDIENCE,
  },
}; 