describe('Task Tracker - basic UI', () => {
  beforeEach(() => {
    // 👇 make the app happy: always give it some tasks (or an empty list)
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: [],
    }).as('getTasks');

    cy.visit('/');
    cy.wait('@getTasks');
  });

  it('shows the heading', () => {
    cy.contains('Task Tracker').should('be.visible');
  });

  it('adds a new task', () => {
    cy.get('[data-cy="task-input"]').type('Buy milk');
    cy.get('[data-cy="add-btn"]').click();
    cy.contains('[data-cy="task-item"]', 'Buy milk').should('be.visible');
  });
});
