/// <reference types="Cypress" />
//const requiredExample = require('../../fixtures/example.json');

describe('UI Testing Assignment', function() {

    beforeEach(() => {
        // Arrange
        cy.fixture('example.json').then((example) => {
            cy.visit('https://automationintesting.online/');
            //cy.visit(example.baseUrl);
            cy.xpath("//button[text()='Let me hack!']").click();
        });
    });
    
    it('Verifies that the homepage loads successfully', () => {
        // Assert
        cy.get('#root').should('be.visible');
    });

    it('Check of the Admin Panel', () => {
        // Act
        cy.xpath('//a[text()="Admin panel"]').click();
        // Assert
        cy.xpath("//h2[text()='Log into your account']").should('have.text', 'Log into your account');
    });

    it('Check if the login is done successfully', () => {
        // Act
        cy.get('[href="/#/admin"]').click({force: true});
        // Assert
        cy.xpath("//h2[text()='Log into your account']").should('have.text', 'Log into your account');
        //cy.get("button[text()='Let me hack!']").click({force: true})
        cy.get('[data-testid="username"]').should('be.visible');
        //cy.wait('@username')
        //cy.xpath("//input[@id='username']").type("admin").debug()
        cy.get('input[id="username"]').click({force: true}).type('admin').should('have.value', 'admin')
        cy.xpath('input[id="password"]').type('password');
        cy.xpath('button[id="doLogin"]').click();


    });

    // // Negative test case
    // it('Verifies that the user cannot book the displayed room', () => {
    //     cy.fixture('example.json').then((example) => {
    //         // Act
    //         cy.contains('Book this room').click()
    //         cy.get('.room-booking-form > .form-control').type(example.firstName)
    //         cy.get('.col-sm-4 > :nth-child(2) > .form-control').type(example.lastName)
    //         cy.get('.col-sm-4 > :nth-child(3) > .form-control').type(example.email)
    //         cy.get('.col-sm-4 > :nth-child(4) > .form-control').type(example.phoneNumber)
    //         cy.get('.rbc-btn-group').contains('Next').click()
    //         cy.get('.rbc-date-cell').contains('23').click()
    //         cy.get('.book-room').contains('Book').click()

    //         // Assert
    //         cy.get('.alert > :nth-child(1)').should('have.text', 'must not be null')
    //     });
    // });

    // // Negative test case
    // it('Should be able to submit the contact form with correct details and receive a confirmation message', () => {
    //     cy.get('[data-testid="ContactName"]').type('First Name')
    //     cy.get('[data-testid="ContactEmail"]').type('fake@fakeemail.com')
    //     cy.get('[data-testid="ContactPhone"]').type('012345678901')
    //     cy.get('[data-testid="ContactSubject"]').type('Booking issue')
    //     cy.get('[data-testid="ContactDescription"]').type('I recently made a booking through your website. Unfortunately, I have encountered an issue with my booking and I would like to bring it to your attention.')
    //     cy.get('#submitContact').click()

    //     // Assert
    //     cy.get(':nth-child(2) > div > h2').should('have.text', 'Thanks for getting in touch First Name!')
    // });

    // it('Should not be able to submit the contact form with incorrect/incomplete details and receive an error message', () => {
    //     //cy.get('[data-testid="ContactName"]').type('First Name')
    //     cy.get('[data-testid="ContactEmail"]').type('fake@fakeemail.com')
    //     cy.get('[data-testid="ContactPhone"]').type('012345678901')
    //     cy.get('[data-testid="ContactSubject"]').type('Booking issue')
    //     cy.get('[data-testid="ContactDescription"]').type('I recently made a booking through your website. Unfortunately, I have encountered an issue with my booking and I would like to bring it to your attention.')
    //     cy.get('#submitContact').click()

    //     // Assert
    //     cy.get('.alert').should('have.text', 'Name may not be blank')
    // });

    // it('Verifies that an error message is displayed when the user submits an empty Contact Name', () => {
    //     //cy.get('[data-testid="ContactName"]').type('First Name')
    //     cy.get('[data-testid="ContactEmail"]').type('fake@fakeemail.com')
    //     cy.get('[data-testid="ContactPhone"]').type('012345678901')
    //     cy.get('[data-testid="ContactSubject"]').type('Booking issue')
    //     cy.get('[data-testid="ContactDescription"]').type('I recently made a booking through your website. Unfortunately, I have encountered an issue with my booking and I would like to bring it to your attention.')
    //     cy.get('#submitContact').click()

    //     // Assert
    //     cy.get('.alert').should('be.visible')
    // });
  });