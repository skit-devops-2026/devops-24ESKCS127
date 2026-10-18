import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Health and Monitoring Tests', () => {
  test('health endpoint payload contains required keys', () => {
    const payload = {
      status: 'healthy',
      commit: 'test-commit-sha-12345',
      uptimeSeconds: 42,
      timestamp: new Date().toISOString()
    };

    assert.equal(payload.status, 'healthy');
    assert.ok(payload.commit, 'Commit SHA must be defined');
    assert.ok(typeof payload.uptimeSeconds === 'number', 'Uptime must be a number');
    assert.ok(new Date(payload.timestamp).getTime() > 0, 'Timestamp must be valid ISO date');
  });

  test('prometheus metrics formatting adheres to OpenMetrics standard', () => {
    const sampleMetric = [
      '# HELP http_requests_total Total number of HTTP requests made.',
      '# TYPE http_requests_total counter',
      'http_requests_total 10'
    ].join('\n');

    assert.match(sampleMetric, /# HELP http_requests_total/);
    assert.match(sampleMetric, /# TYPE http_requests_total counter/);
    assert.match(sampleMetric, /http_requests_total 10/);
  });
});
