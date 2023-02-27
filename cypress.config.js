const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qfjeqz',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
    videoUploadOnPasses: true,
    viewportHeight: 1080,
    viewportHeight: 1920
  },
});
