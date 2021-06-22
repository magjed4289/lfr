/// <reference types="cypress"/>
import { When, Then } from "cypress-cucumber-preprocessor/steps";
import FormsPage from "../../../support/page_objects/forms/FormsPage";

const formsPage = new FormsPage();

Given('I go somewhere', () => {
    cy.wait(300000);
});

When('some other thing', () => {
    cy.wait(500);
});

Then ('the result',() => {
    cy.wait(500);
});