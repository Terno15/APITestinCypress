/// <reference types="cypress" />
// cypress/integration/api_test.spec.js
describe('Test API GET avec Cypress', () => {
    it('Devrait récupérer la liste des utilisateurs avec succès', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          // Vérifier que le statut est 200 (succès)
          expect(response.status).to.eq(200);
  
          // Vérifier que la réponse contient un tableau de 10 utilisateurs
          expect(response.body).to.have.length(10);
  
          // Vérifier que le premier utilisateur a un nom "Leanne Graham"
          expect(response.body[0]).to.have.property('phone', '1-770-736-8031 x56442');
        });
    });
  });
  