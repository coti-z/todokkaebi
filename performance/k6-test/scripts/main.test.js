import { SharedArray } from 'k6/data';
import { sleep } from 'k6';
import {
  testProjectCreation,
  testProjectQuery,
  testProjectsQuery,
} from './scenarios/project.test.js';
import { testUserInfo } from './scenarios/user.test.js';

// Load 1000 test accounts for all VUs to share
const accounts = new SharedArray('accounts', function () {
  return JSON.parse(open('../tools/create-account/data/accounts.json'));
});

export let options = {
  scenarios: {
    // Scenario 1: Project listing load test
    project_listing: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 100 }, // Ramp up to 100 users
        { duration: '30s', target: 500 }, // Scale to 300 users
        { duration: '20s', target: 0 }, // Ramp down
      ],
      gracefulRampDown: '10s',
      exec: 'projectListingScenario',
    },

    // Scenario 2: Project creation load test
    project_creation: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 }, // Ramp up to 50 users
        { duration: '1m', target: 1000 }, // Scale to 200 users
        { duration: '20s', target: 0 }, // Ramp down
      ],
      gracefulRampDown: '10s',
      exec: 'projectCreationScenario',
      startTime: '10s', // Start after listing scenario begins
    },

    // Scenario 3: Full workflow test
    full_workflow: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 20 }, // Ramp up to 20 users
        { duration: '20s', target: 100 }, // Scale to 100 users
        { duration: '1m', target: 1000 }, // Scale to 500 users
        { duration: '20s', target: 0 }, // Ramp down
      ],
      gracefulRampDown: '30s',
      exec: 'fullWorkflowScenario',
      startTime: '30s', // Start after other scenarios begin
    },

    // Scenario 4: Peak load test
    peak_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 200 }, // Quick ramp to 200
        { duration: '2m', target: 1000 }, // Peak load: 1000 users
        { duration: '20s', target: 0 }, // Quick ramp down
      ],
      gracefulRampDown: '30s',
      exec: 'peakLoadScenario',
      startTime: '2m', // Start after workflows are running
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% of requests under 3s
    http_req_failed: ['rate<0.05'], // Error rate under 5%
    checks: ['rate>0.9'], // Check success rate over 90%

    // Scenario-specific thresholds
    'http_req_duration{scenario:project_listing}': ['p(95)<2000'],
    'http_req_duration{scenario:project_creation}': ['p(95)<5000'],
    'http_req_duration{scenario:full_workflow}': ['p(95)<8000'],
    'http_req_duration{scenario:peak_load}': ['p(95)<10000'],
  },
};

export function setup() {
  console.log(`Loaded test accounts: ${accounts.length}`);
  console.log(`Test started at: ${new Date().toISOString()}`);

  // Test connection with first account
  const testAccount = accounts[0];
  const isValid = testUserInfo(testAccount.accessToken);

  if (!isValid) {
    console.error('Setup failed: Unable to validate test account');
    throw new Error('Test account validation failed');
  }

  console.log('Setup completed: Test accounts validated');
  return { accounts };
}

// Scenario 1: Project listing only
export function projectListingScenario() {
  const account = getAccountForVU();

  console.log(
    `[VU:${__VU}] Project listing scenario - Account: ${account.email}`,
  );

  const result = testProjectsQuery(account.accessToken);

  if (result.success) {
    const projectCount =
      result.data?.queryProjects?.data?.projects?.length || 0;
    console.log(`[VU:${__VU}] ✓ Found ${projectCount} projects`);
  }

  sleep(1);
}

// Scenario 2: Project creation only
export function projectCreationScenario() {
  const account = getAccountForVU();

  console.log(
    `[VU:${__VU}] Project creation scenario - Account: ${account.email}`,
  );

  const projectId = testProjectCreation(account.accessToken);

  if (projectId) {
    console.log(`[VU:${__VU}] ✓ Created project: ${projectId}`);
  } else {
    console.error(`[VU:${__VU}] ✗ Project creation failed`);
  }

  sleep(2);
}

// Scenario 3: Full workflow (list -> create -> query detail)
export function fullWorkflowScenario() {
  const account = getAccountForVU();

  console.log(
    `[VU:${__VU}] Full workflow scenario - Account: ${account.email}`,
  );

  // Step 1: List existing projects
  console.log(`[VU:${__VU}] Step 1: Query existing projects`);
  const listResult = testProjectsQuery(account.accessToken);
  sleep(1);

  // Step 2: Create new project
  console.log(`[VU:${__VU}] Step 2: Create new project`);
  const projectId = testProjectCreation(account.accessToken);
  if (!projectId) {
    console.error(`[VU:${__VU}] Workflow failed: Project creation failed`);
    return;
  }
  sleep(1);

  // Step 3: Query created project details
  console.log(`[VU:${__VU}] Step 3: Query project details`);
  const detailResult = testProjectQuery(account.accessToken, projectId);

  if (detailResult.success) {
    console.log(`[VU:${__VU}] ✓ Full workflow completed successfully`);
  } else {
    console.error(`[VU:${__VU}] ✗ Workflow failed at detail query`);
  }

  sleep(1);
}

// Scenario 4: Peak load with mixed operations
export function peakLoadScenario() {
  const account = getAccountForVU();

  console.log(`[VU:${__VU}] Peak load scenario - Account: ${account.email}`);

  // Randomly choose operation for peak load testing
  const operations = [
    () => testProjectsQuery(account.accessToken),
    () => testProjectCreation(account.accessToken),
    () => {
      const projectId = testProjectCreation(account.accessToken);
      if (projectId) {
        return testProjectQuery(account.accessToken, projectId);
      }
    },
  ];

  const randomOp = operations[Math.floor(Math.random() * operations.length)];
  randomOp();

  sleep(0.5); // Shorter sleep for peak load
}

// Helper function to get account for current VU
function getAccountForVU() {
  const accountIndex = (__VU - 1) % accounts.length;
  return accounts[accountIndex];
}

export function teardown() {
  console.log(`Test completed at: ${new Date().toISOString()}`);
  console.log(`Total accounts used: ${accounts.length}`);
}
