export const AUTH_MUTATIONS = {
  LOGIN: `#graphql
  mutation BasicLogin($input: LoginInput!) {
    basicLogin(input: $input) {
      success
      message
      data {
        userId
        accessToken
        refreshToken
      }
    }
  }
  `,
  LOGOUT: `#graphql
  mutation BasicLogout($input: LogoutInput!) {
    basicLogout(input: $input) {
      success
      message
      data {
        userId
      }
    }
  }
  `,

  REISSUE_TOKEN: `#graphql
  mutation ReissueToken($input: ReissueTokenInput!) {
    reissueToken(input: $input) {
      success
      message
      data {
        userId
        accessToken
        refreshToken
      }
    }
  }
  `,
};
