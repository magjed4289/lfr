/// <reference types="cypress"/>
import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import FormsPage from "../../../support/PageObjects/forms/FormsPage";
import SuccessPage from '../../../support/PageObjects/forms/SuccessPage';

const formsPage = new FormsPage();
const successPage = new SuccessPage();

Before({ tags: "@big-viewport" }, () => {
  cy.viewport(1280, 720);
});

Given('I am on the form page', () => {
  cy.visit('/');
  if (Cypress.env('language') == "pt_BR") {
    formsPage.getLexiconIcon().click();
    formsPage.getPtBrBox().click();
    formsPage.getEnUsLexiconIcon().should('not.be.visible');
    formsPage.getPtBrLexiconIcon().should('be.visible');
  }
  else {
    formsPage.getEnUsLexiconIcon().should('be.visible');
  }
});

When('I submit the form with a valid data set', () => {
  cy.fixture('data_' + Cypress.env('language')).then(data => {
    formsPage.fillForm(data);
    formsPage.submitForm();
  })
});

Then('I should be informed about my data being processed', () => {
  cy.fixture('data_' + Cypress.env('language')).then(data => {
    successPage.getAlertContainer().should('have.text', data.successMsg)
  })
});

When('I go to pick my birthDate to the calendar', () => {
  formsPage.goToTheCalendar();
});

Then('I am able to pick the {string} correctly', (year) => {
  formsPage.selectYearOfBirth(year);
  formsPage.getYearBox().find('option:selected').should('have.text', year);
});