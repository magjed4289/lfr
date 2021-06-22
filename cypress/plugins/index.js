/// <reference types="cypress" />
// *********************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// *********************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const path = require('path');
const fs = require('fs');
const cucumber = require('cypress-cucumber-preprocessor').default;

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber());
  var newConfig = getConfigurationForEnvironment(config.env.environment);
  newConfig.env = newConfig.env || {};
  return newConfig;
}

function getConfigurationForEnvironment(environment) {
  var readedConfig = {};
  const pathToConfigFile = path.resolve('cypress/config', `${environment}.json`);
  try {
    var rawData = fs.readFileSync(pathToConfigFile, 'utf8');
    readedConfig = JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Unable to read configuration file for environment: ${environment}\nCaused by: ${err.message}`);
  }
  return readedConfig;
}