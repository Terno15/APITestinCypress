/// <reference types="cypress" />
describe('Learn REST API Testing with Cypress', () => {
  it('First API Cypress request', () => {
    cy.request('/users/6').then((response) =>{
    cy.log(JSON.stringify(response.body.data.first_name))
    cy.log(JSON.stringify(response.body.data.last_name))
    })
  })
  it('API Test - Status Codes', () => {
    cy.request('GET', '/users/6').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('API Tests - GET Request', () =>{
    cy.request({
      url: '/users/2', method: 'GET'}).as('user')
    cy.get('@user').then((res)=>{
      cy.log(JSON.stringify(res.body))
      expect(res.body.data.id).eq(2)
      expect(res.body.data.email).eq('janet.weaver@reqres.in')
      expect(res.body.data.first_name).eq('Janet')
      expect(res.status).to.eq(200);
      expect(res.body.data.last_name).not.to.contain('fuck you')
      const userID = res.body.data.id
      expect(userID).to.equal(2)
    })
  })
  it('API Tests - POST Request', () =>{
    cy.request({url:'/login', method: 'POST', body: { email: 'eve.holt@reqres.in', password: 'cityslicka' },}).as('loginRequest')
    cy.get('@loginRequest').its('status').should('equal', 200)
    cy.get('@loginRequest').then((res) =>{
      expect(res.body.token).not.to.include('toto')
      expect(res.body.token).to.eql('QpwL5tke4Pnpja7X4')
      const userIID = res.body.id
      expect(userIID).not.to.eql('QpwL5tke4Pnpja7X4')
    })
  })
  it('API Tests - POST Request - ERROR - Missing password', () =>{
    cy.request({
      url:'/login',
      method: 'POST', 
      failOnStatusCode:false,
      body: { email: 'eve.holt@reqres.in' },
    }).as('loginQuest')
  cy.get('@loginQuest').its('status').should('equal', 400)
  cy.get('@loginQuest').then((ress)=>{
    expect(ress.body.error).to.equal('Missing password')
  })
})
it('API Tests - POST Request - ERROR - Missing email or username', () =>{
  cy.request({
    url:'/login',
    method: 'POST', 
    failOnStatusCode:false,
    body: { password: 'cityslicka' },
  }).as('loginQuest')
cy.get('@loginQuest').its('status').should('equal', 400)
cy.get('@loginQuest').then((ress)=>{
  expect(ress.body.error).to.equal('Missing email or username')
})
})
it('API Tests - POST Request - DELETE', () =>{
  cy.request({
    url:'/users/1',
    method: 'DELETE'}).as('deleteUser')
    cy.get('@deleteUser').its('status').should('equal', 204)
})
it('API Tests - PUT Request', () => {
  cy.request({
    url: '/users/2',
    method: 'PUT',
    body: { name: 'morpheus', 
      job: 'zion resident', 
      email:'toto@reqres.toto', 
      first_name: 'thierno'
  },
    auth: { bearer: 'my-token-value'},
  }).as('putRequest')
  cy.get('@putRequest').its('status').should('equal', 200)
  cy.get('@putRequest').then((res) => {
    expect(res.body.name).to.equal('morpheus')
    expect(res.body.job).to.equal('zion resident')
    expect(res.body.email).to.equal('toto@reqres.toto')
    expect(res.body.first_name).not.to.equal('Tghierno')
  })
})
})