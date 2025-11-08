describe('Task Tracker - slow network handling', () => {
  it('shows tasks after a delayed API', () => {
    // match any origin + that path
    cy.intercept('GET', '**/api/tasks', {
      delay: 2000,
      statusCode: 200,
      body: [
        { id: 1, title: 'Delayed task A' },
        { id: 2, title: 'Delayed task B' },
      ],
    }).as('getTasks');

    // you can use cy.visit('/') if baseUrl is set
    cy.visit('/');

    // the app now fired GET /api/tasks → we wait for OUR mocked one
    cy.wait('@getTasks');

    // make sure we didn't go down the error branch
    cy.get('[data-cy="error"]').should('not.exist');

    // now the normal list should be rendered
    cy.get('[data-cy="task-item"]').should('have.length', 2);
  });
});
