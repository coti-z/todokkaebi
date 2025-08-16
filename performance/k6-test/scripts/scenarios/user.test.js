import { check } from 'k6';
import { GraphQLClient } from '../../lib/graphql-client.js';
import { Mutations, Queries } from '../../lib/queries.js';

export function testLogin(email, password) {
  const client = new GraphQLClient();
  
  const loginResponse = client.request(
    Mutations.LOGIN,
    {
      input: {
        email: email,
        password: password
      }
    },
    { name: 'Login' }
  );
  
  const result = client.parseResponse(loginResponse);
  
  check(result, {
    'Login success': (r) => r.success === true,
    'Access token returned': (r) => r.data?.basicLogin?.data?.accessToken !== undefined,
  });
  
  if (result.success) {
    return result.data.basicLogin.data.accessToken;
  }
  return null;
}

export function testUserInfo(accessToken) {
  const client = new GraphQLClient(accessToken);
  
  // Note: This would require a user info query in your GraphQL schema
  // For now, we'll just test that the token works with projects query
  const response = client.request(
    Queries.QUERY_PROJECTS,
    {},
    { name: 'UserInfoTest' }
  );
  
  const result = client.parseResponse(response);
  
  check(result, {
    'User token valid': (r) => r.success === true,
  });
  
  return result.success;
}