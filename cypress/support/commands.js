// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import FormsPage from './PageObjects/forms/FormsPage.js'

const formsPage = new FormsPage

Cypress.Commands.add(
    'selectNth',
    { prevSubject: 'element' },
    (subject, pos) => {
        cy.wrap(subject)
            .children('option')
            .eq(pos)
            .then(e => {
                cy.wrap(subject).select(e.val())
            })
    }
)

Cypress.Commands.add(
  'selectNthByValue',
  { prevSubject: 'element' },
  (subject, value) => {
    cy.wrap(subject)
      .children('option')
      .each(($el) => {
        var year = $el.text();
        if (year == value) {
          cy.wrap($el)
            .then($el => {
              cy.wrap(subject).select($el.val())
            })
        }
      }
      )
  }
)

/// #TODO change all force clicks in the code
Cypress.Commands.add('clickForce', {
        prevSubject: 'element'
      }, (subject) => {
        cy.wrap(subject).click({force:true})
})

/// #TODO change all force checks in the code
Cypress.Commands.add('checkForce', {
    prevSubject: 'element'
  }, (subject) => {
    cy.wrap(subject).check({force:true})
})

Cypress.Commands.add('useForms', () => {
  formsPage.getSomethingElse();
})