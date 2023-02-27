/// <reference types="Cypress" />

describe('UI Testing Assignment', function() {
  beforeEach(() => {
    cy.fixture('example.json').as('allData')
    cy.get('@allData').then((vars) => {
      // Arrange
      cy.visit(vars.baseUrl)
      
    }) 
  });

  it('Verifies that the homepage loads successfully', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.xpath(vars.letMeHackButton).click()
      // Assert
      cy.get(vars.homePage).should('be.visible')
    })
  });

  it('Check of the Admin Panel', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.xpath(vars.adminPanel).click();

      // Assert
      cy.xpath(vars.adminPanelTitle).should('have.text', 'Log into your account')
    })
  });

  it('Check if the login is done successfully', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.loginAdminPanel(vars.AdminPanelUsername, vars.AdminPanelPassword)

      // Assert
        
    })
  });

  it('Add another accessible room', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.addARoom(vars.optionViews, vars.optionRefresh, vars.optionTV)

      // Assert
        
    })
  });

  it('Verify that the user cannot book a room if the date is not selected', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.get(vars.bookRoomButton).click()
      cy.get(vars.firstNameField).type(vars.firstName)
      cy.get(vars.lastNameField).type(vars.lastName)
      cy.get(vars.emailField).type(vars.email)
      cy.get(vars.phoneNumberField).type(vars.phoneNumber)
      cy.get(vars.specificDate).contains(vars.selectedDate).click()
      cy.get(vars.bookButton).contains(vars.bookButtonName).click()

      // Assert
      cy.get(vars.bookError).find('p').should('have.text', vars.bookErrorMessage)
    })
  });

  it('Should be able to submit the contact form with correct details and receive a confirmation message', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.fillContactForm(vars.firstName, vars.email, vars.phoneNumber, vars.subjectCF, vars.descriptionCF)

      // Assert
      cy.xpath(vars.successCFSubmission).should('have.text', vars.successCFSubmissionText + vars.firstName + '!')
    })
  });

  it('Verify if the submit form is sent correctly', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.loginAdminPanel(vars.AdminPanelUsername, vars.AdminPanelPassword)
      cy.get(vars.notificationSelector).click()

      // Assert
      cy.get(vars.allMessagesSelector).should('be.visible')

      // Act
      cy.get(vars.allMessagesTable).each((nessage) => {
        cy.wrap(nessage).then(($label) => {
          const label = $label.text()
          if (vars.firstName.includes(label)) {
            cy.wrap(nessage).click({force: true})
          }
        })
      })

      // Assert
      cy.get(vars.messageTitle).should('have.text', 'From: '+vars.firstName)
    })
  })

  it('Verifies that an error message is displayed when the user submits an empty Contact Name', () => {
    cy.get('@allData').then((vars) => {
      // Act
      cy.fillContactForm(' ', vars.email, vars.phoneNumber, vars.subjectCF, vars.descriptionCF)

      // Assert
      cy.get(vars.contactFormAlert).should('be.visible')
    })
  });
});