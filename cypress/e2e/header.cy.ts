// cypress/e2e/header.cy.ts
describe("Header Component on Home Page", () => {
  it("renders and contains the call link", () => {
    cy.visit("/");
    cy.get('[data-testid="call-link"]').should(
      "have.attr",
      "href",
      "tel:+998712000807"
    );
  });
});
