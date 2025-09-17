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
  mutation BasicLogout {
    basicLogout {
      success
      message
      data {
        userId
      }
    }
  }
  `,

  REISSUE_TOKEN: `#graphql
  mutation ReissueToken {
    reissueToken {
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
