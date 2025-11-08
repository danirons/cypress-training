describe('Task Tracker - API data', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: [
        { id: 1, title: 'First mocked task' },
        { id: 2, title: 'Second mocked task' },
      ],
    }).as('getTasks');

    cy.visit('/');
  });

  it('renders tasks from the API', () => {
    cy.wait('@getTasks');
    cy.contains('[data-cy="task-item"]', 'First mocked task').should(
      'be.visible'
    );
    cy.contains('[data-cy="task-item"]', 'Second mocked task').should(
      'be.visible'
    );
  });
});
