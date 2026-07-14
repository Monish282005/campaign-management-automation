const { expect } = require("@playwright/test");

class CampaignPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.executionTab = page.getByTestId("tab-execution");
    this.resetButton = page.getByTestId("reset-data-button");

    // Form
    this.campaignName = page.getByTestId("campaign-name-input");
    this.channel = page.getByTestId("channel-select");
    this.audience = page.getByTestId("audience-select");
    this.sendMode = page.getByTestId("send-mode-select");
    this.schedule = page.getByTestId("schedule-input");
    this.message = page.getByTestId("message-input");

    this.estimateButton = page.getByTestId("estimate-button");
    this.estimateValue = page.getByTestId("audience-estimate");

    this.createButton = page.getByTestId("create-campaign-button");

    // Validation
    this.formError = page.getByTestId("form-error");

    // Filters
    this.statusFilter = page.getByTestId("status-filter");
    this.channelFilter = page.getByTestId("channel-filter");

    // Campaign List
    this.campaignCards = page.getByTestId("campaign-card");

    // API Panel
    this.apiResponse = page.getByTestId("api-response");
  }

  async open() {
    await this.page.goto("/");
    await this.executionTab.click();
  }

  async resetData() {
    await this.resetButton.click();
  }

  async fillCampaign({ name, channel, audience, sendMode, schedule, message }) {
    await this.campaignName.fill(name);

    await this.channel.selectOption(channel);

    await this.audience.selectOption(audience);

    await this.sendMode.selectOption(sendMode);

    if (sendMode === "scheduled") {
      await this.schedule.fill(schedule);
    }

    await this.message.fill(message);
  }

  async estimateAudience() {
    await this.estimateButton.click();
  }

  async createCampaign() {
    await this.createButton.click();
  }

  campaignCard(name) {
    return this.campaignCards.filter({
      has: this.page.getByTestId("campaign-name").filter({
        hasText: name,
      }),
    });
  }

  async launchCampaign(name) {
    const card = this.campaignCard(name);

    await card.getByTestId("launch-campaign-button").click();

    await expect(card.getByTestId("campaign-status")).toHaveText("Queued", {
      timeout: 10000,
    });
  }
  async filterStatus(status) {
    await this.statusFilter.selectOption(status);
  }

  async filterChannel(channel) {
    await this.channelFilter.selectOption(channel);
  }
}

module.exports = { CampaignPage };
