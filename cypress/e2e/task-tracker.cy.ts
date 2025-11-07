describe('Task Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the page title', () => {
    cy.contains('Task Tracker').should('be.visible');
    cy.contains('Capture what you need to do today').should('be.visible');
  });

  it('adds a new task to the list', () => {
    cy.get('[data-cy="task-input"]').type('Buy groceries');
    cy.get('[data-cy="add-btn"]').click();
    cy.contains('[data-cy="task-item"]', 'Buy groceries').should('be.visible');
  });

  it('clears the input after adding', () => {
    cy.get('[data-cy="task-input"]').type('write tests');
    cy.get('[data-cy="add-btn"]').click();
    cy.get('[data-cy="task-input"]').should('have.value', '');
  });

  it('does not add empty tasks', () => {
    cy.get('[data-cy="add-btn"]').click();
    cy.get('[data-cy="task-item"]').should('not.exist');
  });
});
