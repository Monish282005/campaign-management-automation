const { test, expect } = require('@playwright/test');
const { CampaignPage } = require('../pages/CampaignPage');

test.beforeEach(async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.open();
  await campaign.resetData();
});

test('Create Campaign Successfully', async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: 'Automation Test Campaign',
    channel: 'Email',
    audience: 'trial-users',
    sendMode: 'now',
    message: 'This is an automation test message for Playwright.'
  });

  await campaign.estimateAudience();

  await expect(campaign.estimateValue)
    .toHaveText('1840 recipients');

  await campaign.createCampaign();

  await expect(
    campaign.campaignCard('Automation Test Campaign')
  ).toBeVisible();
});

test('Campaign Name Validation', async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: 'AB',
    channel: 'Email',
    audience: 'trial-users',
    sendMode: 'now',
    message: 'This is an automation test message.'
  });

  await campaign.createCampaign();

  await expect(campaign.formError)
    .toContainText('between 3 and 80');
});

test('Audience Estimate', async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: 'Estimate Campaign',
    channel: 'Email',
    audience: 'trial-users',
    sendMode: 'now',
    message: 'This is an automation test message.'
  });

  await campaign.estimateAudience();

  await expect(campaign.estimateValue)
    .toHaveText('1840 recipients');
});

test('Launch Draft Campaign', async ({ page }) => {
  const campaign = new CampaignPage(page);

  // launchCampaign() itself waits until the status becomes Sent
  await campaign.launchCampaign('Dormant Buyer SMS Winback');
});

test('Filter Sent Campaigns', async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.filterStatus('Sent');

  await expect(
    campaign.campaignCard('Premium Push Onboarding')
  ).toBeVisible();
});