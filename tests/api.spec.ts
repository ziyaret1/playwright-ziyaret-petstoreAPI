import { test, expect } from '@playwright/test';

test.describe('Health check API', () => {

  test('GET /api/public/health returns 200', async ({ request }) => {
    const response = await request.get('https://qa-course-01-api.andersenlab.com/api/public/health');
    expect(response.status()).toBe(200);

    const data = await response.text();
    console.log('Response:', data);
  });

});
