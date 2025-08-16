export const testOptions = {
  stages: [
    { durations: '30s', target: 10 },
    { durations: '1m', target: 50 },
    { durations: '5m', target: 1000 },
    { durations: '2m', target: 500 },
    { durations: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1'],
  },
};

export function getOptions(env = 'dev') {
  const configs = {
    dev: {
      ...testOptions,

      stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
    },

    production: {
      ...testOptions,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 500 },
        { duration: '5m', target: 1500 }, // 더 높은 부하
        { duration: '2m', target: 500 },
        { duration: '1m', target: 0 },
      ],
    },
  };

  return configs[env] || configs.dev;
}
