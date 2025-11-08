describe('Task Tracker - API error handling', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/tasks', {
      statusCode: 500,
      body: { message: 'Server exploded 💥' },
    }).as('getTasks');
    cy.visit('/');
  });

  it('shows an error message when the API fails', () => {
    cy.wait('@getTasks');
    cy.get('[data-cy="error"]')
      .should('be.visible')
      .and('contain.text', 'Something went wrong');
  });
});
