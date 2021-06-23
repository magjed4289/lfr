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
const LANG = require('../data/languages.json');
const testValue = {};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber());


  on('task', {
    pushValue({ name, value }) {
      //console.log(name, value)
      testValue[name] = value
      //console.log(testStore)
      return true
    },
  });

  on('task', {
    getValue(name) {
      return testValue[name]
    },
  });

  var newConfig = getConfigurationForEnvironment(config.env.environment);
  newConfig.env = newConfig.env || {};
  newConfig.env.language = getLanguage(config, newConfig);

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

function getLanguage(config, environmentConfig) {
  var language = config.env.language || environmentConfig.env.language;
  if (!language && !LANG[language]) {
    throw new Error(`Unable to find '${language}' and so no language has been provided`);
  }
  return language || LANG[language].language;
}