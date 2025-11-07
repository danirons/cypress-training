describe('Task Tracker - API', () => {
  const TASK_A = 'first mocked task';
  const TASK_B = 'second mocked task';

  beforeEach(() => {
    cy.intercept('GET', '/api/tasks', {
      statusCode: 200,
      body: [
        { id: 1, title: TASK_A },
        { id: 2, title: TASK_B },
      ],
    }).as('getTasks');

    cy.visit('/');
  });

  it('loads tasks from the API and displays them', () => {
    // wait for the mocked call to finish
    cy.wait('@getTasks');
    cy.contains('[data-cy="task-item"]', TASK_A).should('be.visible');
    cy.contains('[data-cy="task-item"]', TASK_B).should('be.visible');
  });

  it('allows adding a task on top of API loaded tasks', () => {
    cy.wait('@getTasks');

    cy.get('[data-cy="task-input"]').type('user typed task');
    cy.get('[data-cy="add-btn"]').click();

    cy.contains('[data-cy="task-item"]', 'user typed task').should(
      'be.visible'
    );
  });
});
