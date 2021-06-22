import BasePage from "../BasePage";

class FormsPage extends BasePage {

    constructor() {
        super();
        this.locators = {
            'something': 'something',
            'somethingElse': '[qa-identifier="something-else"]'
        }
    }

    getSomething() {
        return cy.get(this.locators['something'])
    }

    getSomethingElse() {
        return cy.get(this.locators['somethingElse'])
    }

    tryWithIf() {
        cy.get("body").then($body => {
            if($body.find(this.locators['somethingElse'], {timeout: 30000}).lenght > 0) { //evaluates as true
                this.getSomethingElse().click();
            }
        });
    }
}
export default FormsPage