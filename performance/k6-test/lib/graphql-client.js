import { check } from 'k6';
import http from 'k6/http';
const BASE_URL = 'http://localhost:3000/graphql';

export class GraphQLClient {
  constructor(accessToken = null) {
    this.accessToken = accessToken;
    this.headers = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      this.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  request(query, variables = {}, tags = {}) {
    const payload = JSON.stringify({
      query,
      variables,
    });

    const params = {
      headers: this.headers,
      tags,
    };

    const response = http.post(BASE_URL, payload, params);

    check(response, {
      'GraphQL 요청 성공': r => r.status === 200,
    });

    return response;
  }

  parseResponse(response) {
    try {
      const body = JSON.parse(response.body);
      return {
        success: body.data && !body.errors,
        data: body.data,
        errors: body.errors,
      };
    } catch (error) {
      return {
        success: false,
        errors: [{ message: 'Response parsing failed' }],
      };
    }
  }
}
