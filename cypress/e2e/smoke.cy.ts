describe('smoke', () => {
  it('loads the app', () => {
    cy.visit('/');
    cy.contains('Task Tracker').should('be.visible');
  });
});
