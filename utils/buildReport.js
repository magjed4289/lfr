const report = require('multiple-cucumber-html-reporter')
const fs = require('fs-extra')
const attachment = require('./attachment.js');
const chalk = require('chalk');

const reportFolder = './reports/';
const cucumberJsonDir = reportFolder + 'cucumber-preprocessor-jsons';
const screenshotsDir = reportFolder + 'screenshots';

function generateReport(jsonFolder, outputFolder) {
    console.log(chalk.green('- Generating html reprot'));
    if (!fs.existsSync(jsonFolder)) {
      console.error(`ERROR: Folder ./${jsonFolder} not found. REPORT CANNOT BE CREATED!`);
      process.exit(1);
    } else {
      report.generate({
        jsonDir: jsonFolder,
        reportPath: outputFolder,
        saveCollectedJSON: false,
        reportName: `Liferay web acceptance test - ${new Date().toLocaleString()}`,
        disableLog: true
      })
    }
  }
  

attachment.addScreenshotToReport(cucumberJsonDir, screenshotsDir);
generateReport(cucumberJsonDir, reportFolder + '/html');
