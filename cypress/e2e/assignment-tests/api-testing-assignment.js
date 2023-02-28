/// <reference types="Cypress" />

describe('UI Testing Assignment', function() {
    let returnedResponse;
    let bookingId;
    
    beforeEach(() => {
        cy.request('https://restful-booker.herokuapp.com/booking')
    })
    
    // Create a token
    it('Create a token', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            cy.request({
                method: 'POST',
                url: 'https://restful-booker.herokuapp.com/auth',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    username: 'admin',
                    password: 'password123'
                }
            }).then((response) => {
                returnedResponse = response.body.token;
                expect(response.status).to.eq(200);
                cy.log(returnedResponse)
            });
        })
    });

    // Get bookings
    it('Get bookings', () => {
        cy.request({
            method: 'GET',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Authorization': 'Bearer ' + returnedResponse,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });
    

    // Create a booking
    it('Create a booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                'Authorization': 'Bearer ' + returnedResponse,
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
            bookingId = response.body.bookingid;
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('bookingid');
            cy.log(bookingId)
            cy.log(returnedResponse)
            cy.log(response)
        });
    });
    
    
    // Update a booking
    it('Update a booking', () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/'+bookingId,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + returnedResponse
            },
            body: {
                firstname: 'Test',
                lastname: 'API',
                totalprice: 100,
                depositpaid: false,
                bookingdates: {
                    checkin: '2020-10-20',
                    checkout: '2020-11-10'
                },
                additionalneeds: 'None'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body.depositpaid)
            expect(response.body).to.have.property('depositpaid', false);
        });
    });
    
    // Partially update bookings
    it('Partially update bookings', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://restful-booker.herokuapp.com/booking/'+bookingId,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + returnedResponse
            },
            body: {
                firstname: 'Test10',
                lastname: 'API10'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('lastname', 'API10');
        });
    });
    
    // Delete a booking
    it('Delete a booking', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://restful-booker.herokuapp.com/booking/'+bookingId,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'token=' + returnedResponse
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});