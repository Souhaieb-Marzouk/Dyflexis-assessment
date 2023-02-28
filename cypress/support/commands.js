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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
Cypress.on('uncaught:exception', (err, runnable) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('list not defined')) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})
Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // when the exception originated from an unhandled promise
    // rejection, the promise is provided as a third argument
    // you can turn off failing the test in this case
    if (promise) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})

Cypress.Commands.add('loginAdminPanel', (username, password) => {
  cy.get('@allData').then((vars) => {
    cy.xpath(vars.adminPanel).click()
    cy.xpath(vars.adminPanelTitle).should('have.text', 'Log into your account')
    cy.get(vars.usernameSelector).focus().type(username)
    cy.get(vars.passwordSelector).focus().type(password)
    cy.get(vars.buttonSelector).click()
  })
})

Cypress.Commands.add('bookingARoom', (firstName, lastName, email, phoneNumber, selectedDate, bookButtonName) => {
  cy.get('@allData').then((vars) => {
    cy.get(vars.bookRoomButton).click()
    cy.get(vars.firstNameField).type(firstName)
    cy.get(vars.lastNameField).type(lastName)
    cy.get(vars.emailField).type(email)
    cy.get(vars.phoneNumberField).type(phoneNumber)
    cy.get(vars.specificDate).contains(selectedDate).click()
    cy.get(vars.bookButton).contains(bookButtonName).click()
  })
})

Cypress.Commands.add('addARoom', (optionWifi, optionTV, optionRadio, optionRefresh, optionSafe, optionViews) => {
  cy.get('@allData').then((vars) => {
    cy.loginAdminPanel(vars.AdminPanelUsername, vars.AdminPanelPassword)
    cy.log(vars.selectorsNumber)
    cy.get(vars.roomNumberSelector).focus().type(vars.roomNumber)
    cy.xpath(vars.roomTypeSelector).select(vars.roomType)
    cy.xpath(vars.roomAccessibilitySelector).select(vars.roomAccessibility)
    cy.get(vars.roomPriceSelector).type(vars.roomPrice)
    cy.selectCheckboxes([optionWifi, optionTV, optionRadio, optionRefresh, optionSafe, optionViews])
    cy.get(vars.createRoomButton).click()
  })
})

Cypress.Commands.add('selectCheckboxes', (checkboxNames) => {
  cy.get('@allData').then((vars) => {
    cy.get(vars.allCheckboxesSelectors).each((checkbox) => {
      cy.wrap(checkbox).siblings('label').then(($label) => {
        const label = $label.text()
        if (checkboxNames.includes(label)) {
          cy.wrap(checkbox).check()
        }
      })
    })
  })
})

Cypress.Commands.add('fillContactForm', (firstName, email, phone, subject, description) => {
  cy.get('@allData').then((vars) => {
    cy.get(vars.contactFormName).type(firstName)
    cy.get(vars.contactFormEmail).type(email)
    cy.get(vars.contactFormPhone).type(phone)
    cy.get(vars.contactFormSubject).type(subject)
    cy.get(vars.contactFormDescription).type(description)
    cy.get(vars.contactFormButton).click()
  })
})
let response
Cypress.Commands.add('commonRequest', (methodName, link) => {
  cy.fixture('api-testing.json').then(commonRequest => {
    cy.request({
      method: methodName,
      url: link,
      headers: commonRequest.request.headers,
      body: commonRequest.request.body
    }).then((res) => {
      cy.wrap(res).as('response')
        //windows.response = res
    });
  })
});