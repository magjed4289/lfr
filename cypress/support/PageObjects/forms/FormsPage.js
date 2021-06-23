import BasePage from "../BasePage";

class FormsPage extends BasePage {

    constructor() {
        super();
        this.locators = {
            'ptBrLexiconIcon': '[class*="lexicon-icon-pt-br"]',
            'enUsLexiconIcon': '[class*="lexicon-icon-en-us"]',
            'lexiconIcon': '#uvlz____ > .lexicon-icon > use',
            'ptBrBox': '[id="_com_liferay_dynamic_data_mapping_form_web_portlet_DDMFormPortlet_kldx______menu__portugues_2d_brasil__1"]',
            'nameBox': 'input[name*="WhatIsYourName"]',
            'bodyBox': 'textarea[name*="WhyDidYouJoinTheTestingArea"]',
            'calendarIcon': '[class*="date-picker-dropdown-toggle"]',
            'calendarMonth': '[name=month]',
            'calendarYear': '[name=year]',
            'calendarDay': '[class="date-picker-date date-picker-calendar-item"]',
            'submitFormBtn': '[id="ddm-form-submit"]',
            'formBody': '[id="_com_liferay_dynamic_data_mapping_form_web_portlet_DDMFormPortlet_fm"]'
        }
    }

    getLexiconIcon() {
        return cy.get(this.locators['lexiconIcon']);
    }

    getFormBody() {
        return cy.get(this.locators['formBody']);
    }

    getPtBrBox() {
        return cy.get(this.locators['ptBrBox']);
    }

    getPtBrLexiconIcon() {
        return cy.get(this.locators['ptBrLexiconIcon']);
    }

    getEnUsLexiconIcon() {
        return cy.get(this.locators['enUsLexiconIcon']);
    }

    getYearBox() {
        return cy.get(this.locators['calendarYear']);
    }

    submitForm() {
        cy.get(this.locators['submitFormBtn']).click(); 
    }



    tryWithIf() {
        cy.get("body").then($body => {
            if ($body.find(this.locators['somethingElse'], { timeout: 30000 }).lenght > 0) { //evaluates as true
                this.getSomethingElse().click();
            }
        });
    }

    fillForm(data) {
        cy.get(this.locators['nameBox']).type(data.name);
        cy.get(this.locators['bodyBox']).type(data.body);
        this.pickBirthDate(data);
    }

    goToTheCalendar() {
        cy.get(this.locators['calendarIcon']).click();
    }

    pickBirthDate(data) {
        this.goToTheCalendar();
        this.selectMonthOfBirth(data.monthOfBirth - 1);
        this.selectYearOfBirth(data.yearOfBirth);
        this.selectDayOfBirth(data.dayOfBirth);
    }

    selectMonthOfBirth(data) {
        cy.get(this.locators['calendarMonth']).selectNth(data - 1);
    }

    selectDayOfBirth(data) {
        cy.get(this.locators['calendarDay']).contains(data).should('be.enabled').click();
    }

    selectYearOfBirth(data) { 
        cy.get(this.locators['calendarYear']).selectNthByValue(data);
    }
}
export default FormsPage