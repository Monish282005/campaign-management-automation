const { test, expect } = require("@playwright/test");

test("Health API returns 200", async ({ request }) => {
  const response = await request.get(
    "https://campaign-management-rose.vercel.app/api/health",
  );

  expect(response.status()).toBe(200);
});

test("Campaign API returns seeded campaigns", async ({ request }) => {
  const response = await request.get(
    "https://campaign-management-rose.vercel.app/api/campaigns",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.summary.total).toBeGreaterThan(0);
  expect(body.data.length).toBeGreaterThan(0);

  expect(body.data[0]).toHaveProperty("id");
  expect(body.data[0]).toHaveProperty("name");
  expect(body.data[0]).toHaveProperty("status");
});
