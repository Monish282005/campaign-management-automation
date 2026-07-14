# Campaign Management Automation

## Overview

This project contains automated UI and API tests for the Campaign Management application using Playwright.

The automation validates the core campaign workflow, including campaign creation, audience estimation, campaign launch, filtering, and API verification.

---

## Tech Stack

- Playwright
- JavaScript
- Node.js

---

## Framework Design

The project follows the Page Object Model (POM) design pattern for better maintainability and code reuse.

- Page Object Model for reusable page actions
- Separate UI and API test files
- Playwright HTML reporting

---

## Project Structure

```
pages/
    CampaignPage.js

tests/
    campaign.spec.js
    api.spec.js

playwright.config.cjs
package.json
README.md
```

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/Monish282005/campaign-management-automation.git
cd campaign-management-automation
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## Running the Tests

Run all tests

```bash
npx playwright test
```

Run UI tests

```bash
npx playwright test tests/campaign.spec.js
```

Run API tests

```bash
npx playwright test tests/api.spec.js
```

Open the HTML report

```bash
npx playwright show-report
```

---

## Test Scenarios Covered

| ID    | Scenario                                         | Status |
| ----- | ------------------------------------------------ | ------ |
| TC-01 | Create a campaign successfully                   | ✅     |
| TC-02 | Validate campaign name length                    | ✅     |
| TC-03 | Verify audience estimation                       | ✅     |
| TC-04 | Launch a draft campaign                          | ✅     |
| TC-05 | Filter campaigns by status                       | ✅     |
| TC-06 | Verify Health API returns HTTP 200               | ✅     |
| TC-07 | Verify Campaign API returns seeded campaign data | ✅     |

---

## API Tests

The following API validations are implemented:

- Verify Health API returns HTTP 200.
- Verify Campaign API returns seeded campaign data.
- Validate basic response structure.

---

## Assumptions

- The application is accessible during test execution.
- Seeded campaign data is available.
- The Reset Data functionality restores the application to its initial state before each test.

---

## Observations

- Campaign launch is processed asynchronously.
- After clicking **Launch**, the campaign status transitions from **Draft** to **Queued** before final delivery.

---

## Future Improvements

If more time were available, the following enhancements could be added:

- Cross-browser execution
- Data-driven testing
- Negative API test cases
- CI/CD integration
- Additional UI validation scenarios
- Improved test reporting

---

## Future Test Strategy

For future application enhancements involving multi-tenant onboarding:

- Validate Owner, Admin, and Member roles.
- Verify invite-based onboarding flow.
- Validate role-based access permissions.
- Verify tenant isolation.
- Test invitation acceptance and rejection scenarios.
