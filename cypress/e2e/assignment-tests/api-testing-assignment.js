/// <reference types="Cypress" />

describe('UI Testing Assignment', function() {
    let returnedResponse;
    let bookingId;
    
    // Create a token
    it('Create a token', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.tokenMethod,
                url: commonRequest.tokenURL,
                headers: {
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                },
                body: commonRequest.tokenHeader.body
            })
            // Assert
            .then((response) => {
                returnedResponse = response.body.token;
                expect(response.status).to.eq(commonRequest.tokenResponse);
            });
        })
    });

    // Get bookings
    it('Get bookings', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.getBookingMethod,
                url: commonRequest.BookingURL,
                headers: {
                    'Authorization': 'Bearer ' + returnedResponse,
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                }
            })
            // Assert
            .then((response) => {
                expect(response.status).to.eq(commonRequest.getBookingResponse.code);
                expect(response.body).to.be.an(commonRequest.getBookingResponse.type);
            });
        })
    });
    

    // Create a booking
    it('Create a booking', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.createBookingMethod,
                url: commonRequest.BookingURL,
                headers: {
                    'Authorization': 'Bearer ' + returnedResponse,
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                },
                body: commonRequest.createBookingHeader.body
            })
            // Assert
            .then((response) => {
                bookingId = response.body.bookingid;
                expect(response.status).to.eq(commonRequest.createBookingResponse);
                expect(response.body).to.have.property('bookingid');
            });
        })
    });
    
    
    // Update a booking
    it('Update a booking', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.updateMethod,
                url: commonRequest.BookingURL+bookingId,
                headers: {
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                    'Accept': commonRequest.commonHeaders.Accept,
                    'Cookie': 'token=' + returnedResponse
                },
                body: commonRequest.updateHeader.body
            })
            // Assert
            .then((response) => {
                expect(response.status).to.eq(commonRequest.updateResponse.code);
                expect(response.body).to.have.property('depositpaid', commonRequest.updateResponse.depositpaid);
                expect(response.body).to.have.property('totalprice', commonRequest.updateResponse.totalprice);
            });
        })
    });
    
    // Partially update bookings
    it('Partially update bookings', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.partialUpdateMethod,
                url: commonRequest.BookingURL+bookingId,
                headers: {
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                    'Accept': commonRequest.commonHeaders.Accept,
                    'Cookie': 'token=' + returnedResponse
                },
                body: commonRequest.partialUpdateHeader.body
            })
            // Assert
            .then((response) => {
                expect(response.status).to.eq(commonRequest.partialUpdateResponse.code);
                expect(response.body).to.have.property('lastname', commonRequest.partialUpdateResponse.lastname);
            });
        })
    });
    
    // Delete a booking
    it('Delete a booking', () => {
        cy.fixture('api-testing.json').then(commonRequest => {
            // Act
            cy.request({
                method: commonRequest.DeleteMethod,
                url: commonRequest.BookingURL+bookingId,
                headers: {
                    'Content-Type': commonRequest.commonHeaders.ContentType,
                    'Cookie': 'token=' + returnedResponse
                }
            })
            // Assert
            .then((response) => {
                expect(response.status).to.eq(commonRequest.DeleteResponse);
            });
        })
    });
});