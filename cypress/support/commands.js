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

Cypress.Commands.add('addARoom', (optionWifi, optionTV, optionRadio, optionRefresh, optionSafe, optionViews) => {
  cy.get('@allData').then((vars) => {
    cy.loginAdminPanel(vars.AdminPanelUsername, vars.AdminPanelPassword)
    cy.get(vars.allRemoveButtons).its('length').then((length) => {
      cy.writeFile('cypress/fixtures/other.json', { "selectorsNumber": length });
    });
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

Cypress.Commands.add('BookingModification', (methodName, bookingId, token) => {
  cy.request({
    method: +methodName,
    url: 'https://restful-booker.herokuapp.com/booking/'+bookingId,
    headers: {
      'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': 'token='+token
    },
    body: {
      firstName: 'Test10',
      lastName: 'API10',
      depositPaid: false
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('bookingid', bookingId);
  });
})