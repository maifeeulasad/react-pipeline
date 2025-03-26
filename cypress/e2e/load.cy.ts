describe('loading webpage', () => {
  it('load landing page', () => {
    cy.visit('http://localhost:5173/react-pipeline/');
  });
});
