const { test, expect } = require("@playwright/test");
const { CampaignPage } = require("../pages/CampaignPage");

test.beforeEach(async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.open();
  await campaign.resetData();
}); 

// 1. Create Campaign
test("Create Campaign Successfully", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: "Automation Test Campaign",
    channel: "Email",
    audience: "trial-users",
    sendMode: "now",
    message: "This is an automation test message for Playwright.",
  });

  await campaign.estimateAudience();

  await expect(campaign.estimateValue).toHaveText("1840 recipients");

  await campaign.createCampaign();

  await expect(campaign.campaignCard("Automation Test Campaign")).toBeVisible();
});

// 2. Campaign Name Validation
test("Campaign Name Validation", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: "AB",
    channel: "Email",
    audience: "trial-users",
    sendMode: "now",
    message: "This is an automation test message.",
  });

  await campaign.createCampaign();

  await expect(campaign.formError).toContainText("between 3 and 80");
});

// 3. Campaign Message Validation
test("Campaign Message Validation", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: "Message Validation",
    channel: "Email",
    audience: "trial-users",
    sendMode: "now",
    message: "AAAA",
  });

  await campaign.createCampaign();

  await expect(campaign.formError).toContainText("between 10 and 240");
});

// 4. Audience Estimate
test("Audience Estimate", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.fillCampaign({
    name: "Estimate Campaign",
    channel: "Email",
    audience: "trial-users",
    sendMode: "now",
    message: "This is an automation test message.",
  });

  await campaign.estimateAudience();

  await expect(campaign.estimateValue).toHaveText("1840 recipients");
});

// 5. Launch Draft Campaign
test("Launch Draft Campaign", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.launchCampaign("Dormant Buyer SMS Winback");
});

// 6. Filter Sent Campaigns
test("Filter Sent Campaigns", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.filterStatus("Sent");

  await expect(campaign.campaignCard("Premium Push Onboarding")).toBeVisible();
});

test("Filter Email Campaigns", async ({ page }) => {
  const campaign = new CampaignPage(page);

  await campaign.filterChannel("Email");

  await expect(campaign.campaignCard("Trial Upgrade Email")).toBeVisible();
});
