import BasePage from "../BasePage";

class SuccessPage extends BasePage {

    constructor() {
        super();
        this.locators = {
            'alertContainer': '[id="ToastAlertContainer"]'
        }
    }

    getAlertContainer() {
        return cy.get(this.locators['alertContainer']);
    }
}
export default SuccessPage;