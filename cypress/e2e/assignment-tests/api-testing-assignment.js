/// <reference types="Cypress" />

describe('UI Testing Assignment', function() {

    // beforeEach(() => {
    //     cy.request('https://restful-booker.herokuapp.com/booking')
    // })

    // Create a token
    it('Create a token', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: 'adminUser',
                password: 'password123'
            }
        }).then((response) => {
            window.token = response.body.token;
            cy.wrap(response.body.token).as('token');
            cy.log(response.body.token)
        });
    });

    // Get bookings
    it('Get bookings', () => {
        cy.request({
            method: 'GET',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Authorization': 'Bearer ' + window.token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            cy.log(response.body)
        });
    });
    

    // Create a booking
    it('Create a booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Authorization': 'Bearer ' + window.token,
                'Content-Type': 'application/json'
            },
            body: {
                firstname: 'Test',
                lastname: 'API',
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: '2020-10-20',
                    checkout: '2020-11-10'
                },
                additionalneeds: 'None'
            }
        }).then((response) => {
            window.bookingId = response.body.bookingid;
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('bookingid');
            cy.log(window.bookingId)
            cy.log(window.token)
        });
    });
    
    
    // Update a booking
    it('Update a booking', () => {
        cy.BookingModification("PUT", window.bookingId, window.token)
    });
    
    // Partially update bookings
    it('Partially update bookings', () => {
        cy.BookingModification('PATCH', window.bookingId, window.token)
    });
    
    // Delete a booking
    it('Delete a booking', () => {
        cy.BookingModification('DELETE', window.bookingId, window.token)
    });
});