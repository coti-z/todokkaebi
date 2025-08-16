import { check } from 'k6';
import { GraphQLClient } from '../../lib/graphql-client.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { Mutations, Queries } from '../../lib/queries.js';

export function testProjectCreation(accessToken) {
  const client = new GraphQLClient(accessToken);
  const projectName = `Project-${__VU}-${__ITER}-${randomString(10)}`;
  const createResponse = client.request(
    Mutations.CREATE_PROJECT,
    { input: { name: projectName } },
    { name: 'CreateProject' },
  );

  const result = client.parseResponse(createResponse);

  check(result, {
    'Project creation success': r => r.success === true,
    'Project ID returned': r => r.data?.createProject?.data?.id !== undefined,
  });

  if (!result.success) {
    return null;
  }
  return result.data.createProject.data.id;
}

export function testProjectQuery(accessToken, projectId) {
  const client = new GraphQLClient(accessToken);

  const detailResponse = client.request(
    Queries.QUERY_PROJECT,
    { input: { projectId } },
    { name: 'QueryProject' },
  );

  const detailResult = client.parseResponse(detailResponse);

  check(detailResult, {
    'Project detail query success': r => r.success === true,
    'Correct project ID': r => r.data?.queryProject?.data?.id === projectId,
  });

  return detailResult;
}

export function testProjectsQuery(accessToken) {
  const client = new GraphQLClient(accessToken);

  const listResponse = client.request(
    Queries.QUERY_PROJECTS,
    {},
    { name: 'QueryProjects' },
  );

  const listResult = client.parseResponse(listResponse);
  check(listResult, {
    'Projects list query success': r => r.success === true,
  });

  return listResult;
}
