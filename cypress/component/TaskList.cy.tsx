import TaskList, { Task } from '../../src/components/TaskList';

describe('TaskList component', () => {
  it('renders loading state', () => {
    cy.mount(<TaskList tasks={[]} loading />);
    cy.get('[data-cy="loading"]').should('contain.text', 'Loading');
  });

  it('renders error state', () => {
    cy.mount(<TaskList tasks={[]} error />);
    cy.get('[data-cy="error"]').should('contain.text', 'Something went wrong');
  });

  it('renders empty state', () => {
    cy.mount(<TaskList tasks={[]} />);
    cy.get('[data-cy="empty-state"]').should('exist');
  });

  it('renders list of tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'mock task 1' },
      { id: 2, title: 'mock task 2' },
    ];

    cy.mount(<TaskList tasks={mockTasks} />);
    cy.get('[data-cy="task-item"]').should('have.length', 2);
    cy.contains('mock task 1');
  });
});
